import { NextResponse } from "next/server";
import { hasPurchased } from "@/lib/exam/hasPurchased";
import { adminAuth } from "@/lib/firebase-admin";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const providerId = url.searchParams.get("providerId");
  const examCode = url.searchParams.get("examCode");

  if (!providerId || !examCode) {
    return NextResponse.json({ hasPaid: false });
  }

  // 🔐 VERIFY FIREBASE ID TOKEN
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ hasPaid: false });
  }

  const token = authHeader.replace("Bearer ", "");
  const decoded = await adminAuth.verifyIdToken(token);

  const hasPaid = await hasPurchased(
    decoded.uid,
    providerId,
    examCode
  );

  return NextResponse.json({ hasPaid });
}
