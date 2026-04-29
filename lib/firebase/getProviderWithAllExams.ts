import {
  collection, doc, getDoc, getDocs, query, where, orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function getProviderWithAllExams(providerId: string) {
  if (!providerId) return null;

  const providerRef = doc(db, "providers", providerId);
  const providerSnap = await getDoc(providerRef);
  if (!providerSnap.exists()) return null;

  const examsSnap = await getDocs(
    query(
      collection(db, "providers", providerId, "exams"),
      where("providerId", "==", providerId),
      where("isActive", "==", true),
      orderBy("__name__")
    )
  );

  return {
    id: providerSnap.id,
    name: "",
    slug: "",
    ...(providerSnap.data() as any),
    exams: examsSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })),
  };
}
