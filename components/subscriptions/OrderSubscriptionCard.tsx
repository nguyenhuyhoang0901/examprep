"use client";

import Link from "next/link";
import dayjs from "dayjs";

function capitalizeFirstLetter(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function OrderSubscriptionCard({ order }: any) {
  const now = Date.now();
  const expiresAt = order.expiresAt?.toMillis?.() ?? 0;

  const isActive =
    order.status === "paid" && expiresAt > now;

  const href = `/exams/${order.providerId}/${order.examCode}`;

  return (
    <div
      className={`border rounded-xl p-4 transition
        ${
          isActive
            ? "hover:shadow-md cursor-pointer"
            : "opacity-60 cursor-default"
        }
      `}
    >
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="font-semibold text-sm mb-1">
            {order.examTitle}
          </h3>

          <p className="text-xs text-gray-500 mb-1">
            Provider: {capitalizeFirstLetter(order.providerId)}
          </p>

          <span
            className={`inline-block text-xs font-medium px-2 py-0.5 rounded
              ${
                isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-600"
              }
            `}
          >
            {isActive ? "Active" : "Expired"}
          </span>

          <p className="text-xs text-gray-500 mt-2">
            Expires:{" "}
            {dayjs(expiresAt).format("DD/MM/YYYY HH:mm")}
          </p>
        </div>

        {isActive && (
          <Link
            href={href}
            className="text-xs font-medium text-blue-600 underline"
          >
            Go to exam →
          </Link>
        )}
      </div>
    </div>
  );
}
