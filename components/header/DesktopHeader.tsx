"use client";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import AccountMenu from "./AccountMenu";
import ExploreDropdown from "./ExploreDropdown";
import SearchBar from "./SearchBar";

export default function DesktopHeader() {
  const { user, loading } = useAuth();
  return (
    <header className="hidden md:block sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center gap-4 px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo-examprep.png"
            alt="ExamPrep"
            width={90}
            height={34}
            priority
            className="h-[34px] w-auto object-contain"
          />
        </Link>

        {/* Explore */}
        <ExploreDropdown />

        {/* Search — thay input cũ bằng SearchBar */}
        <SearchBar />

        <div className="flex items-center gap-3">
          {!loading && user ? (
            <AccountMenu />
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-gray-700 hover:text-black"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="text-sm font-medium border border-black px-4 py-2 rounded hover:bg-black hover:text-white"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
