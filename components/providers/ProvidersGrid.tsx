"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import ProviderCard from "./ProviderCard";

type Exam = {
  id: string;
  code: string;
  title: string;
};

type Provider = {
  id: string;
  name: string;
  slug: string;
  popular?: boolean;
  order?: number;
  exams: Exam[];
};

export default function ProvidersGrid() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        // 1️⃣ Load providers
        const providersSnap = await getDocs(
          query(
            collection(db, "providers"),
            where("popular", "==", true),
            orderBy("order")
          )
        );

        // 2️⃣ Với mỗi provider → load exams theo providerId
        const providersWithExams: Provider[] = await Promise.all(
          providersSnap.docs.map(async (doc) => {
            const examsSnap = await getDocs(
              query(
                collection(db, "providers", doc.id, "exams"),
                where("providerId", "==", doc.id),
                where("isActive", "==", true),
                orderBy("popular", "desc"),
                limit(10)
              )
            );

            return {
              id: doc.id,
              ...(doc.data() as Omit<Provider, "id" | "exams">),
              exams: examsSnap.docs.map((e) => ({
                id: e.id,
                ...(e.data() as Omit<Exam, "id">),
              })),
            };
          })
        );

        setProviders(providersWithExams);
      } catch (error) {
        console.error("🔥 Failed to load providers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  if (loading) {
    return (
      <div className="text-sm text-gray-500">
        Loading providers...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {providers.map((provider) => (
        <ProviderCard key={provider.id} provider={provider} />
      ))}
    </div>
  );
}
