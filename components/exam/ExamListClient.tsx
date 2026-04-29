"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { useAuth } from "@/components/auth/AuthProvider";

type Exam = {
  id: string;
  title: string;
  code?: string;
  totalQuestions?: number;
  questionCount?: number;
};

type OrderInfo = {
  examCode: string;
  expiresAt: number; // milliseconds
};

type Props = {
  exams: Exam[];
  providerSlug: string;
};

export default function ExamListClient({ exams, providerSlug }: Props) {
  const { user, loading } = useAuth();
  const [orderMap, setOrderMap] = useState<Map<string, OrderInfo>>(new Map());

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      const token = await user.getIdToken();
      const res = await fetch(
        `/api/user-orders?providerId=${providerSlug}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      const map = new Map<string, OrderInfo>(
        (data.orders ?? []).map((o: OrderInfo) => [o.examCode, o])
      );
      setOrderMap(map);
    };

    fetchOrders();
  }, [user, providerSlug]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <ExamCard key={exam.id} exam={exam} providerSlug={providerSlug} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {exams.map((exam) => {
        const order = orderMap.get(exam.code?.toLowerCase() ?? "");
        return (
          <ExamCard
            key={exam.id}
            exam={exam}
            providerSlug={providerSlug}
            order={order}
          />
        );
      })}
    </div>
  );
}

function ExamCard({
  exam,
  providerSlug,
  order,
}: {
  exam: Exam;
  providerSlug: string;
  order?: OrderInfo;
}) {
  const now = Date.now();
  const isActive = !!order && order.expiresAt > now;
  const isExpired = !!order && order.expiresAt <= now;
  const questionCount = exam.totalQuestions ?? exam.questionCount;

  return (
    <Link
      href={`/exams/${providerSlug}/${exam.id}`}
      className="border rounded-lg p-5 bg-white hover:shadow-md transition block relative"
    >
      {/* Badge — tái sử dụng style từ OrderSubscriptionCard */}
      {order && (
        <span
          className={`absolute top-3 right-3 text-xs font-medium px-2 py-0.5 rounded
            ${isActive
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
            }`}
        >
          {isActive ? "Active" : "Expired"}
        </span>
      )}

      <h3 className="font-semibold mb-2 pr-20">{exam.title}</h3>

      {exam.code && (
        <p className="text-sm text-gray-500">
          Exam code: {exam.code.toUpperCase()}
        </p>
      )}

      {/* totalQuestions — tái sử dụng field từ getExamData */}
      {questionCount != null && (
        <p className="text-sm text-gray-500 mt-1">
          Dump: {questionCount} questions
        </p>
      )}

      {/* Expire — tái sử dụng dayjs + toMillis pattern từ OrderSubscriptionCard */}
      {order && (
        <p className={`text-sm mt-2 font-medium ${
          isExpired ? "text-red-600" : "text-orange-500"
        }`}>
          {isExpired ? "Expired: " : "Expires: "}
          {dayjs(order.expiresAt).format("DD/MM/YYYY HH:mm")}
        </p>
      )}

      <p className="text-sm text-blue-600 mt-3">View exam →</p>
    </Link>
  );
}
