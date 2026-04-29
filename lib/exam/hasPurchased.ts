import "server-only";
import { adminDb } from "@/lib/firebase-admin";

export async function hasPurchased(
  userId: string,
  providerId: string,
  examCode: string
): Promise<boolean> {
  const snap = await adminDb
    .collection("orders")
    .where("userId", "==", userId)
    .where("providerId", "==", providerId)
    .where("examCode", "==", examCode)
    .where("status", "==", "paid") // hoặc "PAID" – nhớ thống nhất
    .limit(1)
    .get();

  return !snap.empty;
}
