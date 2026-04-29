"use client";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Register() {
  const register = async () => {
    await createUserWithEmailAndPassword(
      auth,
      "user@gmail.com",
      "123456"
    );
  };

  return <button onClick={register}>Register</button>;
}
