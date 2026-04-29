import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

export async function getPopularProviders() {
  const q = query(
    collection(db, "providers"),
    where("popular", "==", true),
    orderBy("order", "asc")
  );

  const snap = await getDocs(q);

  const providers = await Promise.all(
    snap.docs.map(async (doc) => {
      const provider = { id: doc.id, ...doc.data() };

      const examsSnap = await getDocs(
        query(
          collection(db, `providers/${doc.id}/exams`),
          where("popular", "==", true),
          orderBy("order", "asc"),
          limit(12)
        )
      );

      return {
        ...provider,
        exams: examsSnap.docs.map((e) => ({
          id: e.id,
          ...e.data(),
        })),
      };
    })
  );

  return providers;
}
