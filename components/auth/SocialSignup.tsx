"use client";

import { useRouter } from "next/navigation";
import { signupWithGoogle } from "@/lib/auth";

export default function SocialSignup() {
  const router = useRouter();

  async function handleGoogle() {
    try {
      const user = await signupWithGoogle();
      console.log("Google signup success:", user.email);

      // Redirect sau signup
      router.push("/");
    } catch (error) {
      console.error("Google signup failed:", error);
      alert("Google sign up failed. Please try again.");
    }
  }

  return (
    <div className="mt-8">
      {/* Separator */}
      <div className="flex items-center gap-3 mb-6">
        <hr className="flex-1 border-gray-300" />
        <span className="text-sm text-gray-500">
          Other sign up options
        </span>
        <hr className="flex-1 border-gray-300" />
      </div>

      {/* Social buttons */}
      <div className="flex gap-4 justify-center">
	  
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
      </div>
    </div>
  );
}
