"use client";

import { signupWithGoogle } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function SocialLogin() {
  const router = useRouter();

  async function handleGoogle() {
    try {
      await signupWithGoogle();
      router.push("/");
    } catch (err) {
      alert("Google login failed");
      console.error(err);
    }
  }

  return (
    <ul className="flex justify-center gap-4">
      <li>
        <button
          type="button"
          onClick={handleGoogle}
          aria-label="Continue with Google"
          className="border border-gray-300 rounded-full p-3 hover:bg-gray-50"
        >
          <svg className="w-6 h-6">
            <use href="#icon-google" />
          </svg>
        </button>
      </li>
    </ul>
  );
}
