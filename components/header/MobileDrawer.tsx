"use client";

import Link from "next/link";

export default function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className="absolute left-0 top-0 h-full w-72 bg-white shadow-lg p-4 overflow-y-auto">
        <button
          onClick={onClose}
          className="mb-4 text-sm text-gray-500"
        >
          Close
        </button>

        {/* Explore */}
        <details className="mb-3">
          <summary className="font-medium cursor-pointer">
            Explore
          </summary>
          <ul className="ml-4 mt-2 space-y-2 text-sm">
            <li>
              <Link
                href="/vouchers"
                onClick={onClose}
                className="block"
              >
                Vouchers
              </Link>
            </li>
            <li>
              <Link
                href="/exams"
                onClick={onClose}
                className="block"
              >
                All Exams
              </Link>
            </li>
          </ul>
        </details>

        
      </aside>
    </div>
  );
}
