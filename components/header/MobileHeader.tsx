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
          {/* Help button */}
          <Link href="/guide" title="Help" className="p-1 rounded hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </Link>		        
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
