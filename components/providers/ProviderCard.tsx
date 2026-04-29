import Link from "next/link";

export default function ProviderCard({ provider }: any) {
  return (
    <div className="border rounded-lg p-5 hover:shadow-md transition bg-white">
      {/* Provider title */}
      <Link
        href={`/exams/${provider.slug}`}
        className="text-sm font-medium text-blue-600 hover:underline"
      >
        All {provider.name} Exams
      </Link>

      <h3 className="font-semibold mt-2 mb-3">
        Top {provider.name} Certification Exams
      </h3>

      {/* Exams */}
      <ul className="space-y-1 text-sm">
        {provider.exams.map((exam: any) => (
          <li key={exam.id}>
            <Link
              href={`/exams/${provider.slug}/${exam.id}`}
              className="hover:underline"
            >
              {/* <span className="font-medium">{exam.code}:</span>{" "} */} 
              {exam.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
