"use client";

import { signupWithGoogle } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function GoogleButton() {
  const router = useRouter();

  async function handleGoogle() {
    await signupWithGoogle();
    router.push("/");
  }

  return (
    <button
      onClick={handleGoogle}
      className="w-full border py-3 rounded flex justify-center items-center gap-2 hover:bg-gray-50"
    >
      <svg className="w-5 h-5">
        <use href="#icon-google" />
      </svg>
      Continue with Google
    </button>
  );
}
