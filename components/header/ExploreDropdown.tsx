"use client";

import { useState, useRef } from "react";
import Link from "next/link";

export default function ExploreDropdown() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const closeMenuWithDelay = () => {
    closeTimer.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  };

  return (
    <div
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenuWithDelay}
    >
      {/* Explore button */}
      <button className="px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded">
        Explore
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute left-0 top-full mt-2 w-48 bg-white border rounded-lg shadow-lg z-50"
          onMouseEnter={openMenu}
          onMouseLeave={closeMenuWithDelay}
        >
          <ul className="py-2">
            <li>
              <Link
                href="/vouchers"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Vouchers
              </Link>
            </li>

            <li>
              <Link
                href="/exams"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                All Exams
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
