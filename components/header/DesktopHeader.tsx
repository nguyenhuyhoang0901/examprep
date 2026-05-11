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
        {/* Nút Hướng dẫn — thêm vào đây */}
        <Link href="/guide" className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-black whitespace-nowrap">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="hidden lg:inline">Help</span>
        </Link>


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
