import "server-only"
import { adminDb } from "@/lib/firebase-admin"

export async function getFullQuestions(
  providerId: string,
  examCode: string
) {
  const snap = await adminDb
    .collection("providers")
    .doc(providerId)
    .collection("exams")
    .doc(examCode)
    .collection("questions_full")
    .get()

  if (snap.empty) return []

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}
