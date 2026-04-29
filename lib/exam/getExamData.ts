import { adminDb } from "@/lib/firebase-admin"

/**
 * Lấy thông tin đề thi (bao gồm price)
 * Firestore path:
 * providers/{providerId}/exams/{examCode}
 */
export async function getExamData(
  providerId: string,
  examCode: string
) {
  // 1️⃣ TRUY CẬP RÕ RÀNG COLLECTION "providers"
  const examRef = adminDb
    .collection("providers")      // 👈 collection CHA
    .doc(providerId)              // 👈 ví dụ: "juniper"
    .collection("exams")          // 👈 sub-collection exams
    .doc(examCode)                // 👈 ví dụ: "jn0-664"

  const snap = await examRef.get()

  if (!snap.exists) {
    throw new Error(
      `Exam not found at providers/${providerId}/exams/${examCode}`
    )
  }

  const data = snap.data()

  // 2️⃣ PRICE LẤY CỤ THỂ TỪ ĐÂY
  const price = data?.price

  if (typeof price !== "number") {
    throw new Error("Invalid or missing price field")
  }

  // 3️⃣ TRẢ VỀ RÕ RÀNG
  return {
    id: snap.id,
    title: data?.title,
    price: price,
    salePrice: typeof data?.salePrice === "number" ? data.salePrice : null,
    providerId: data?.providerId,
    isActive: data?.isActive,
    previewLimit: data?.previewLimit,
    totalQuestions: data?.totalQuestions,
  }
}
