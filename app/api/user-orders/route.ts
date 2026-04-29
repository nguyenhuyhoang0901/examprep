import { adminDb } from "@/lib/firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ orders: [] });
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    // Verify token dùng Firebase Admin (giống getFullQuestions)
    const { getAuth } = await import("firebase-admin/auth");
    const decoded = await getAuth().verifyIdToken(token);
    const userId = decoded.uid;

    const providerId = req.nextUrl.searchParams.get("providerId");
    if (!providerId) return NextResponse.json({ orders: [] });

    const snap = await adminDb
      .collection("orders")
      .where("userId", "==", userId)
      .where("providerId", "==", providerId)
      .where("status", "==", "paid")
      .get();

    const orders = snap.docs.map((doc) => {
      const data = doc.data();
      return {
        examCode: (data.examCode as string)?.toLowerCase() ?? "",
        expiresAt: data.expiresAt?.toMillis?.() ?? 0, // số để truyền qua JSON
      };
    });

    return NextResponse.json({ orders });
  } catch {
    return NextResponse.json({ orders: [] });
  }
}
