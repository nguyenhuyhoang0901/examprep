import { adminDb } from "@/lib/firebase-admin";

export async function getAllProviders() {
  const providersSnap = await adminDb
    .collection("providers")
    .orderBy("name", "asc")
    .get();

  const providers = await Promise.all(
    providersSnap.docs.map(async (doc) => {
      const examsSnap = await adminDb
        .collection("providers")
        .doc(doc.id)
        .collection("exams")
        .get();

      return {
        id: doc.id,
        ...doc.data(),
        examCount: examsSnap.size,
      };
    })
  );

  return providers;
}
