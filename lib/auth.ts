import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "./firebase";

/* Email signup */
export async function signupWithEmail(
  email: string,
  password: string
) {
  const cred = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  // 🔥 Gửi email xác nhận
  if (cred.user) {
    await sendEmailVerification(cred.user);
  }

  return cred.user;
}

/* Google signup/login */
export async function signupWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
}
