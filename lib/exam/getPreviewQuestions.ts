import "server-only"
import { adminDb } from "@/lib/firebase-admin"

export async function getPreviewQuestions(
  providerId: string,
  examCode: string,
  limitCount = 5
) {
  const snap = await adminDb
    .collection("providers")
    .doc(providerId)
    .collection("exams")
    .doc(examCode)
    .collection("questions_preview")
    .limit(limitCount)
    .get()

  return snap.docs.map((doc) => {
    const data = doc.data()

    return {
      id: doc.id,
      question: data.question,
      image: data.image || null,
      options: data.options || [],
    }
  })
}
