"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/components/auth/AuthProvider";

export default function AccountMenu() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  if (!user) return null;

  const initial =
    user.displayName?.[0]?.toUpperCase() ||
    user.email?.[0]?.toUpperCase() ||
    "?";

  async function handleLogout() {
    await signOut(auth);
    window.location.href = "/";
  }

  // ✅ xử lý click ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold"
      >
        {initial}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg z-50">
          {/* User info */}
          <div className="px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-semibold">
                {initial}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate max-w-[180px]">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          <hr />

          {/* Menu */}
          <Link
            href="/subscriptions"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            Subscriptions
          </Link>

          <hr />

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
