import { getProviderWithAllExams } from "@/lib/firebase/getProviderWithAllExams";
import ExamListClient from "@/components/exam/ExamListClient";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ providerId: string }>;
}

export default async function ProviderPage({ params }: PageProps) {
  const { providerId } = await params;
  const provider = await getProviderWithAllExams(providerId);
  if (!provider) notFound();

  // 👇 BƯỚC 1: Serialize ngay sau khi fetch, trước khi render
  const serializedExams = provider.exams.map((exam: any) => ({
    id: exam.id,
    title: exam.title ?? "",
    code: exam.code ?? "",
    totalQuestions: exam.totalQuestions ?? exam.questionCount ?? null,
    previewLimit: exam.previewLimit ?? null,
    price: exam.price ?? 0,
    isActive: exam.isActive ?? false,
  }));

  return (
    <>
     <section className="bg-gray-50 py-14 text-center">
       <h1 className="text-4xl font-bold mb-4">{provider.name} Exams</h1>
     
       <p className="text-gray-600 max-w-2xl mx-auto mb-3">
         Browse all available {provider.name} exams and practice to help you pass.
       </p>
     
       <p className="text-gray-700 max-w-2xl mx-auto text-sm">
         All dumps cost <span className="font-bold">990,000 VND</span>, now{" "}
         <span className="text-green-600 font-bold">750,000 VND</span> on 1/1, 2/2 … 12/12{" "}
         - Access valid for <span className="font-bold">60 days</span>.
       </p>
     </section>

      <hr className="border-gray-200" />

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-10">
          <h2 className="text-2xl font-bold">List of {provider.name} exams</h2>
          <p className="text-gray-500 mt-1">{provider.exams.length} exams available</p>
        </div>

        {provider.exams.length === 0 ? (
          <p className="text-gray-500 text-sm">No exams available for this provider.</p>
        ) : (
          // 👇 BƯỚC 2: Truyền serializedExams thay vì provider.exams
          <ExamListClient
            exams={serializedExams}
            providerSlug={provider.slug}
          />
        )}
      </section>
    </>
  );
}
