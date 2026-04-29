import { getAllProviders } from "@/lib/firebase/getAllProviders";
import Link from "next/link";

export default async function ExamsPage() {
  const providers = await getAllProviders();

  return (
    <>
      {/* HERO */}
      <section className="bg-gray-50 py-14 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Our Full List of Available Exams
        </h1>
        <p className="text-gray-600">
          Select a provider to view available exams.
        </p>
      </section>

      {/* LIST */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <ul className="space-y-4">
          {providers.map((provider: any) => (
            <li key={provider.id}>
              <Link
                href={`/exams/${provider.slug}`}
                className="block border rounded-lg px-6 py-4 hover:bg-gray-50 hover:shadow-sm transition"
              >
                <span className="font-medium">
                  {provider.name}
                </span>
                <span className="text-gray-500 text-sm ml-2">
                  ({provider.examCount} exam
                  {provider.examCount !== 1 && "s"})
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
