import Image from "next/image";
import Link from "next/link";

export default function FooterBottomBar() {
  return (
    <div className="bg-white border-t border-gray-200 py-3 px-4 text-xs text-gray-600">
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-2 items-center
                      md:grid-cols-3">
    
        {/* Left: Logo */}
        <div className="flex justify-center md:justify-start">
          <Link
            href="/"
            aria-label="ExamPrep Home"
            className="inline-flex items-center"
          >
            <Image
              src="/logo-examprep.png"
              alt="ExamPrep"
              width={80}
              height={30}
              priority
              className="h-[30px] w-auto object-contain"
            />
          </Link>
        </div>
    
        {/* Center: Copyright */}
        <div className="text-center leading-tight text-gray-500 md:col-span-1">
          © {new Date().getFullYear()} ExamPrep. All rights reserved.
        </div>
    
        {/* Right: Empty (giữ cân layout) */}
        <div className="hidden md:block" />
      </div>
    </div>
  );
}
