import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function hasCourseAccess(
  userId: string,
  courseId: string
) {
  const snap = await getDoc(
    doc(db, "purchases", `${userId}_${courseId}`)
  );
  return snap.exists();
}
