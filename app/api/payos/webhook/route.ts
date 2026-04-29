import { PayOS } from "@payos/node";
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { Timestamp } from "firebase-admin/firestore";

const payos = new PayOS({
  clientId: process.env.PAYOS_CLIENT_ID!,
  apiKey: process.env.PAYOS_API_KEY!,
  checksumKey: process.env.PAYOS_CHECKSUM_KEY!,
});

const VIEW_DURATION_MS = 2 * 30 * 24 * 60 * 60 * 1000; 

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📨 Webhook received:", JSON.stringify(body));

    // payOS ping để verify URL — không có data
    if (!body?.data) {
      return NextResponse.json({ success: true });
    }

    // Xác thực chữ ký (v2 dùng webhooks.verify)
    let webhookData: any;
    try {
      webhookData = await payos.webhooks.verify(body);
    } catch (e) {
      console.error("❌ Verify failed:", e);
      return NextResponse.json({ success: true });
    }

    console.log("✅ Verified:", webhookData);

    if (webhookData.code !== "00") {
      return NextResponse.json({ success: true });
    }

    const orderCode = String(webhookData.orderCode);

    // Idempotent check
    const existingSnap = await adminDb
      .collection("orders")
      .where("txnRef", "==", orderCode)
      .limit(1)
      .get();

    if (!existingSnap.empty) {
      console.log("⚠️ Already processed:", orderCode);
      return NextResponse.json({ success: true });
    }

    // Lấy metadata từ pending_orders
    const pendingSnap = await adminDb
      .collection("pending_orders")
      .doc(orderCode)
      .get();

    if (!pendingSnap.exists) {
      console.error("❌ Pending order not found:", orderCode);
      return NextResponse.json({ success: true });
    }

    const { userId, providerId, examCode } = pendingSnap.data()!;

    const examSnap = await adminDb
      .collection("providers")
      .doc(providerId)
      .collection("exams")
      .doc(examCode)
      .get();

    if (!examSnap.exists) {
      console.error("❌ Exam not found:", { providerId, examCode });
      return NextResponse.json({ success: true });
    }

    const now = Date.now();

    await adminDb.collection("orders").add({
      userId,
      providerId,
      examCode,
      examTitle: examSnap.data()!.title,
      txnRef: orderCode,
      amount: webhookData.amount,
      status: "paid",
      paymentMethod: "payos",
      createdAt: new Date(now),
      expiresAt: Timestamp.fromMillis(now + VIEW_DURATION_MS),
    });

    await adminDb.collection("pending_orders").doc(orderCode).delete();

    console.log(`✅ Order saved: ${orderCode} — ${userId} → ${examCode}`);
    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("❌ Webhook error:", err);
    return NextResponse.json({ success: true });
  }
}
