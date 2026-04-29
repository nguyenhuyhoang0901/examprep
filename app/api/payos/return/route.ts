import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const baseUrl = `${url.protocol}//${url.host}`;
  const code = url.searchParams.get("code");
  const orderCode = url.searchParams.get("orderCode");
  const status = url.searchParams.get("status");

  if (code !== "00" || status !== "PAID") {
    return NextResponse.redirect(`${baseUrl}/payment-failed?reason=payment-failed`);
  }

  try {
    // Thử lấy từ pending_orders trước (webhook chưa kịp xử lý)
    const pendingSnap = await adminDb
      .collection("pending_orders")
      .doc(orderCode!)
      .get();

    if (pendingSnap.exists) {
      const { providerId, examCode } = pendingSnap.data()!;
      return NextResponse.redirect(`${baseUrl}/exams/${providerId}/${examCode}`);
    }

    // Webhook đã xử lý xong → tra từ orders
    const orderSnap = await adminDb
      .collection("orders")
      .where("txnRef", "==", orderCode)
      .limit(1)
      .get();

    if (!orderSnap.empty) {
      const { providerId, examCode } = orderSnap.docs[0].data();
      return NextResponse.redirect(`${baseUrl}/exams/${providerId}/${examCode}`);
    }

    return NextResponse.redirect(`${baseUrl}/payment-failed?reason=order-not-found`);

  } catch (error) {
    console.error("❌ Return error:", error);
    return NextResponse.redirect(`${baseUrl}/payment-failed?reason=server-error`);
  }
}
