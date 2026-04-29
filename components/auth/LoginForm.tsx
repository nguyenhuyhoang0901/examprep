"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import SocialLogin from "./SocialLogin";
import AuthSeparator from "./AuthSeparator";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      await signInWithEmailAndPassword(auth, email, password);

      // 🚀 Không cần set user ở đây
      // AuthProvider sẽ bắt onAuthStateChanged
      router.push("/");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    if (!email) {
      alert("Please enter your email first");
      return;
    }
  
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent. Please check your inbox.");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <input
            type="email"
            required
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            required
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-black"
          />
          <div className="mt-1 text-right">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-xs text-gray-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded text-sm font-medium hover:bg-gray-900 transition"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>

      <AuthSeparator text="Other log in options" />
      <SocialLogin />

      <div className="mt-6 text-sm text-center">
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold underline">
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
}
