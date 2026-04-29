export default function AuthLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-white">
      <div className="w-full max-w-md px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          {title}
        </h1>

        {children}
      </div>
    </section>
  );
}
