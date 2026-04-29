import ProvidersGrid from "@/components/providers/ProvidersGrid";

export default async function Home() {

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="bg-gray-50 py-14 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Practice exams that help you pass
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          High-quality exam questions for Amazon, Microsoft, Google, Juniper, Cisco and more.
        </p>
      </section>

      {/* Divider */}
      <hr className="border-gray-200" />

      {/* ================= VOUCHERS ================= */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Vouchers
          </h2>

          <a
            href="/vouchers"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            View All Vouchers →
          </a>
        </div>
      </section>

      {/* Divider */}
      <hr className="max-w-7xl mx-auto border-gray-200" />

      {/* ================= POPULAR EXAMS ================= */}
      <section className="max-w-7xl mx-auto px-4 pt-16 pb-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold">
            Our Most Popular Exams
          </h2>

          <a
            href="/exams"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            View All Exams →
          </a>
        </div>

        <ProvidersGrid />
      </section>
    </>
  );
}
