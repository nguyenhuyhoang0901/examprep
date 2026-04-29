"use client";

import { useState } from "react";
import { signupWithEmail } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = new FormData(e.currentTarget);
    const email = (form.get("email") as string).trim();
    const password = form.get("password") as string;
    const retype = form.get("retype") as string;

    if (password !== retype) {
      setError("Passwords do not match");
      return;
    }

    try {
      const user = await signupWithEmail(email, password);
      
      router.push(
        `/verify-email?email=${encodeURIComponent(user.email!)}`
      );

    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-sm text-red-600">{error}</p>}

      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="w-full border px-3 py-2 rounded text-sm"
      />

      <div>
        <input
          name="password"
          type="password"
          minLength={7}
          required
          placeholder="Password (7 characters min.)"
          className="w-full border px-3 py-2 rounded text-sm"
        />
      </div>

      <input
        name="retype"
        type="password"
        minLength={7}
        placeholder="Retype password"
        required
        className="w-full border px-3 py-2 rounded text-sm"
      />

      <button className="w-full bg-black text-white py-3 rounded text-sm">
        Sign up
      </button>
    </form>
  );
}
