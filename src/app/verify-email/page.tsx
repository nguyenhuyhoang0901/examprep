"use client";

import { auth } from "@/lib/firebase";
import { sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
  const params = useSearchParams();
  const email = params.get("email") || "";
  const maskedEmail = maskEmail(email);

  const [cooldown, setCooldown] = useState(0);
  const [message, setMessage] = useState("");

  async function resend() {
    if (!auth.currentUser || cooldown > 0) return;

    try {
      await sendEmailVerification(auth.currentUser);
      setMessage("Verification email sent again.");

      setCooldown(60);
      const timer = setInterval(() => {
        setCooldown((c) => {
          if (c <= 1) {
            clearInterval(timer);
            return 0;
          }
          return c - 1;
        });
      }, 1000);
    } catch {
      setMessage(
        "Too many requests. Please try again later."
      );
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-2xl font-bold">
          Verify your email
        </h1>

        <p className="text-sm text-gray-600">
          📩 Please check your email at <br />
          <span className="font-medium">{maskedEmail}</span>
        </p>

        <p className="text-xs text-gray-500">
          You should receive an activation link within a few minutes.
        </p>

        <button
          onClick={resend}
          disabled={cooldown > 0}
          className="text-sm underline disabled:opacity-50"
        >
          {cooldown > 0
            ? `Resend in ${cooldown}s`
            : "Resend verification email"}
        </button>

        {message && (
          <p className="text-xs text-green-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

function maskEmail(email: string) {
  const [name, domain] = email.split("@");
  if (!name || !domain) return email;
  return (
    name[0] +
    "*".repeat(Math.max(1, name.length - 2)) +
    name.slice(-1) +
    "@" +
    domain
  );
}
