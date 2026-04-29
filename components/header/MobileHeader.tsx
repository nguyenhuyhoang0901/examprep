"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import AccountMenu from "./AccountMenu";

export default function MobileHeader({
  onOpenMenu,
}: {
  onOpenMenu: () => void;
}) {
  const { user, loading } = useAuth();

  return (
    <header className="md:hidden sticky top-0 z-50 bg-white border-b">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Menu */}
        <button onClick={onOpenMenu} className="p-2 rounded hover:bg-gray-100">
          <svg className="w-6 h-6">
            <use href="#icon-menu" />
          </svg>
        </button>

        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo-examprep.png"
            alt="ExamPrep"
            width={75}
            height={28}
          />
        </Link>

        {/* Right */}
        <div className="flex items-center gap-2">
          {!loading && user ? (
            /* ===== LOGIN SUCCESS ===== */
            <AccountMenu />
          ) : (
            /* ===== NOT LOGGED IN ===== */
            <Link href="/login" className="text-sm font-medium">
              Log in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
