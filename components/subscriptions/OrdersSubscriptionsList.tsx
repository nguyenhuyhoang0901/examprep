"use client";

import { useEffect, useMemo, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/components/auth/AuthProvider";
import OrderSubscriptionCard from "./OrderSubscriptionCard";

type Order = {
  id: string;
  providerId: string;
  examCode: string;
  examTitle: string;
  status: string;
  expiresAt: any;
  createdAt: any;
};

export default function OrdersSubscriptionsList() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function fetchOrders() {
      const q = query(
        collection(db, "orders"),
        where("userId", "==", user!.uid),
        orderBy("createdAt", "desc")
      );

      const snap = await getDocs(q);

      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as any),
      }));

      setOrders(data);
      setLoading(false);
    }

    fetchOrders();
  }, [user]);

  /**
   * ✅ Chỉ giữ order mới nhất cho mỗi providerId + examCode
   */
  const latestOrders = useMemo(() => {
    const map = new Map<string, Order>();

    for (const order of orders) {
      const key = `${order.providerId}_${order.examCode}`;

      if (!map.has(key)) {
        map.set(key, order);
      }
    }

    return Array.from(map.values());
  }, [orders]);

  if (loading) {
    return <p className="text-sm text-gray-500">Loading subscriptions...</p>;
  }

  if (latestOrders.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        You haven&apos;t purchased any exams yet.
      </p>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {latestOrders.map((order) => (
        <OrderSubscriptionCard key={order.id} order={order} />
      ))}
    </ul>
  );
}
