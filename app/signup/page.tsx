import AuthLayout from "@/components/auth/AuthLayout";
import SignupForm from "@/components/auth/SignupForm";
import SocialSignup from "@/components/auth/SocialSignup";
import Link from "next/link";

export default function SignupPage() {
  return (
    <AuthLayout title="Sign up with email">
      <SignupForm />

      <SocialSignup />

      {/* Terms */}
      <p className="text-xs text-gray-500 mt-6">
        By signing up, you agree to our{" "}
        <Link href="/terms" className="underline">
          Terms of Use
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline">
          Privacy Policy
        </Link>.
      </p>

      {/* Login */}
      <p className="text-sm text-gray-700 mt-6">
        Already have an account?{" "}
        <Link href="/login" className="font-medium underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}
