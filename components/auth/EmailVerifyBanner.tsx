"use client";

import { useAuth } from "@/components/auth/AuthProvider";

export default function EmailVerifyBanner() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user || user.emailVerified) return null;

  return (
    <div className="bg-yellow-50 border-b border-yellow-200 text-sm text-yellow-800 px-4 py-2 text-center">
      📩 Please verify your email to unlock all features.
    </div>
  );
}
