"use client";
import { useState } from "react";
import Link from "next/link";

type Lang = "vi" | "en";

const content = {
  vi: {
    title: "ExamPrep — Nền tảng luyện thi chứng chỉ",
    sub: "Cung cấp bộ dump câu hỏi chính xác cho các chứng chỉ nổi tiếng: Juniper (by HPE), Cisco, Microsoft, CompTIA, Google, EC-Council và nhiều hãng khác.",
    tip: "Bạn có thể xem thử 30 câu hỏi đầu tiên miễn phí trước khi quyết định mua.",
    s1: "1. Đăng nhập / Đăng ký",
    s2: "2. Tìm kiếm đề thi",
    s3: "3. Xem & mua dump",
    s4: "4. Thanh toán",
    s5: "5. My Subscriptions",
    s6: "6. Luyện tập câu hỏi",
    s7: "Câu hỏi thường gặp",
    s8: "Liên hệ & hỗ trợ",
    login: [
      {
        step: 1,
        heading: "Tạo tài khoản mới",
        body: "Nhấn Sign up ở góc trên bên phải. Điền email và mật khẩu, sau đó xác nhận qua email để kích hoạt tài khoản.",
        notes: ["Hoặc đăng nhập nhanh bằng tài khoản Google"],
      },
      {
        step: 2,
        heading: "Đăng nhập",
        body: "Nhấn Log in, nhập email và mật khẩu đã đăng ký.",
        notes: ["Quên mật khẩu? Nhấn 'Forgot password?' trên trang đăng nhập — hướng dẫn đặt lại sẽ gửi về email của bạn."],
      },
    ],
    searchBody: "Dùng thanh tìm kiếm để nhập tên hãng (Juniper, Cisco, CompTIA...) hoặc tên đề thi hoặc mã đề thi cụ thể (AZ-104, JN0-281...). Kết quả hiển thị ngay lập tức.",
    searchTip: "Không tìm thấy mã đề thi bạn cần? Liên hệ qua mục Contact — chúng tôi sẽ xem xét bổ sung.",
    dump: [
      {
        step: 1,
        heading: "30 câu hỏi miễn phí",
        body: "Mỗi bộ dump cho phép xem 30 câu hỏi đầu tiên miễn phí để bạn đánh giá chất lượng trước khi quyết định mua.",
      },
      {
        step: 2,
        heading: "Mở toàn bộ câu hỏi",
        body: "Nhấn Buy Dump để mở khóa toàn bộ câu hỏi trong bộ dump.",
      },
    ],
    priceNormal: "990.000đ",
    priceSale: "750.000đ",
    priceSaleDates: "Giảm còn 750.000đ vào các ngày đặc biệt: 1/1, 2/2, 3/3, ... , 12/12",
    priceDuration: "Thời hạn truy cập: 2 tháng kể từ ngày thanh toán",
    paySteps: [
      "Nhấn Buy Dump trên trang đề thi",
      "Hệ thống chuyển sang trang thanh toán PayOS",
      "Quét mã VietQR bằng app ngân hàng bất kỳ, hoặc chuyển khoản thủ công theo thông tin hiển thị",
      "Nhập đúng số tiền và nội dung chuyển khoản như hướng dẫn",
      "Sau khi hệ thống xác nhận, dump được mở tự động",
    ],
    payWarn: "Nhập chính xác số tiền và nội dung chuyển khoản. Sai nội dung có thể khiến đơn hàng không được xác nhận tự động.",
    subBody: "Sau khi thanh toán, vào trang My Subscriptions (trong menu tài khoản) để xem toàn bộ các dump đã mua, trạng thái Active và ngày hết hạn.",
    subNotes: [
      "Nhấn Go to exam để vào trực tiếp bộ câu hỏi",
      "Các dump hết hạn sẽ hiển thị trạng thái Expired",
    ],
    practice: [
      {
        step: 1,
        heading: "Tìm kiếm câu hỏi",
        body: "Sau khi mở khóa dump, dùng thanh Search để tìm câu hỏi theo từ khóa. Hiển thị số câu tìm được trong tổng số.",
      },
      {
        step: 2,
        heading: "Xem đáp án",
        body: "Hai chế độ hỗ trợ:",
        notes: [
          "Show all answers — hiển thị đáp án toàn bộ dump cùng lúc",
          "Show answer — hiển thị đáp án từng câu riêng lẻ",
        ],
      },
    ],
    practiceTip: "Dùng Navigator ở góc phải màn hình để nhảy nhanh đến bất kỳ câu hỏi nào. Màu xanh = đã trả lời, màu xanh nhạt = kết quả tìm kiếm.",
    faq: [
      { q: "Dump có hiệu lực bao lâu?", a: "2 tháng kể từ ngày thanh toán thành công." },
      { q: "Tôi có thể dùng trên điện thoại không?", a: "Có, giao diện hỗ trợ đầy đủ trên cả máy tính và điện thoại." },
      { q: "Ngày giảm giá là ngày nào?", a: "1/1, 2/2, 3/3, ..., 12/12 — giá giảm còn 750.000đ thay vì 990.000đ." },
      { q: "Mã đề thi tôi cần không có trên web?", a: "Liên hệ qua Contact — chúng tôi có thể bổ sung theo yêu cầu." },
    ],
    contactTitle: "Liên hệ & hỗ trợ",
    contactSub: "Vẫn còn thắc mắc? Liên hệ với chúng tôi qua:",
    contacts: [
      { emoji: "📁", title: "Yêu cầu exam code mới", body: "Không tìm thấy đề thi cần? Nhắn tin qua Contact để được hỗ trợ bổ sung." },
      { emoji: "🎫", title: "Mua voucher thi", body: "Cần voucher để đăng ký thi chính thức? Liên hệ để được tư vấn và hỗ trợ mua." },
      { emoji: "🎓", title: "Dịch vụ thi hộ", body: "Có nhu cầu thi hộ? Trao đổi chi tiết qua kênh Contact của trang web." },
    ],
  },
  en: {
    title: "ExamPrep — Certification Exam Practice Platform",
    sub: "Providing accurate dump question sets for top certifications: Juniper (by HPE), Cisco, Microsoft, CompTIA, Google, EC-Council and more.",
    tip: "You can preview the first 30 questions for free before deciding to purchase.",
    s1: "1. Log in / Sign up",
    s2: "2. Search for exams",
    s3: "3. View & buy dumps",
    s4: "4. Payment",
    s5: "5. My Subscriptions",
    s6: "6. Practice questions",
    s7: "FAQ",
    s8: "Contact & support",
    login: [
      {
        step: 1,
        heading: "Create an account",
        body: "Click Sign up in the top right corner. Enter your email and password, then verify your email to activate your account.",
        notes: ["Or sign in instantly with your Google account"],
      },
      {
        step: 2,
        heading: "Log in",
        body: "Click Log in and enter your registered email and password.",
        notes: ["Forgot your password? Click 'Forgot password?' on the login page — reset instructions will be sent to your email."],
      },
    ],
    searchBody: "Use the search bar to enter a provider name (Juniper, Cisco, CompTIA...), an exam name, or a specific exam code (AZ-104, JN0-281...). Results appear instantly.",
    searchTip: "Can't find the exam code you need? Contact us via the Contact section — we will consider adding it.",
    dump: [
      {
        step: 1,
        heading: "30 free questions",
        body: "Each dump lets you view the first 30 questions for free so you can evaluate quality before purchasing.",
      },
      {
        step: 2,
        heading: "Unlock all questions",
        body: "Click Buy Dump to unlock the full question set.",
      },
    ],
    priceNormal: "990,000 VND",
    priceSale: "750,000 VND",
    priceSaleDates: "Sale price 750,000 VND on special dates: Jan 1, Feb 2, Mar 3, ..., Dec 12",
    priceDuration: "Access duration: 2 months from payment date",
    paySteps: [
      "Click Buy Dump on the exam page",
      "You will be redirected to the PayOS payment page",
      "Scan the VietQR code with any banking app, or transfer manually using the displayed details",
      "Enter the exact amount and transfer note as instructed",
      "Once confirmed by the system, the dump is unlocked automatically",
    ],
    payWarn: "Enter the exact amount and transfer note. Incorrect details may prevent automatic order confirmation.",
    subBody: "After payment, go to My Subscriptions (in the account menu) to view all purchased dumps, Active status, and expiry dates.",
    subNotes: [
      "Click Go to exam to jump directly into the question set",
      "Expired dumps will show an Expired status",
    ],
    practice: [
      {
        step: 1,
        heading: "Search questions",
        body: "After unlocking a dump, use the Search bar on the exam page to find questions by keyword. The number of matches out of total is shown.",
      },
      {
        step: 2,
        heading: "View answers",
        body: "Two modes available:",
        notes: [
          "Show all answers — reveals answers for the entire dump at once",
          "Show answer — reveals the answer for each individual question",
        ],
      },
    ],
    practiceTip: "Use the Navigator panel on the right to jump to any question. Green = answered, light blue = search hit.",
    faq: [
      { q: "How long is a dump valid?", a: "2 months from the date of successful payment." },
      { q: "Can I use it on mobile?", a: "Yes, fully supported on both desktop and mobile devices." },
      { q: "When are the sale dates?", a: "Jan 1, Feb 2, Mar 3, ..., Dec 12 — price drops to 750,000 VND instead of 990,000 VND." },
      { q: "My exam code is not on the site?", a: "Contact us via the Contact page — we can add it on request." },
    ],
    contactTitle: "Contact & support",
    contactSub: "Still have questions? Reach out to us via:",
    contacts: [
      { emoji: "📁", title: "Request a new exam code", body: "Can't find the exam you need? Message us via Contact to request it." },
      { emoji: "🎫", title: "Buy exam vouchers", body: "Need a voucher for the official exam? Contact us for advice and purchasing support." },
      { emoji: "🎓", title: "Exam-taking service", body: "Need assistance taking an exam? Reach out through the Contact section for details." },
    ],
  },
};

const PROVIDERS = ["Juniper (by HPE)", "Cisco", "Microsoft", "CompTIA", "Google", "EC-Council", "AWS", "VMware (by Broadcom)"];

const CONTACT_LINKS = [
  { label: "Email:", value: "sp.examprep@gmail.com", href: "mailto:sp.examprep@gmail.com" },
  { label: "Zalo:", value: "zalo/examprep", href: "https://zalo.me/0386989724" },
  { label: "Facebook:", value: "facebook.com/examprep", href: "https://www.facebook.com/groups/24998889806451870" },
  { label: "Hotline:", value: "(+84).386.989.724", href: "tel:+84386989724" },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-base font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">
      {children}
    </h2>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 text-sm text-blue-700 leading-relaxed">
      💡 {children}
    </div>
  );
}

function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4 text-sm text-amber-700 leading-relaxed">
      ⚠️ {children}
    </div>
  );
}

function StepCard({
  step,
  heading,
  body,
  notes,
}: {
  step: number;
  heading: string;
  body: string;
  notes?: string[];
}) {
  return (
    <div className="border border-gray-200 rounded-xl p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold flex-shrink-0">
          {step}
        </div>
        <h3 className="text-sm font-semibold text-gray-800">{heading}</h3>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
      {notes && notes.length > 0 && (
        <ul className="mt-2 list-disc list-inside text-sm text-gray-500 leading-relaxed space-y-1">
          {notes.map((n, i) => <li key={i}>{n}</li>)}
        </ul>
      )}
    </div>
  );
}

export default function GuidePage() {
  const [lang, setLang] = useState<Lang>("vi");
  const c = content[lang];

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      {/* Hero */}
      <div className="text-center border-b border-gray-200 pb-8 mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">{c.title}</h1>
        <p className="text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">{c.sub}</p>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {PROVIDERS.map((p) => (
            <span key={p} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full border border-gray-200">
              {p}
            </span>
          ))}
        </div>
        {/* Toggle */}
        <div className="inline-flex mt-5 bg-gray-100 border border-gray-200 rounded-lg p-1 gap-1">
          <button
            onClick={() => setLang("vi")}
            className={`px-5 py-1.5 rounded-md text-sm font-medium transition-all ${
              lang === "vi" ? "bg-white border border-gray-200 text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            🇻🇳 VIE
          </button>
          <button
            onClick={() => setLang("en")}
            className={`px-5 py-1.5 rounded-md text-sm font-medium transition-all ${
              lang === "en" ? "bg-white border border-gray-200 text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            🇬🇧 ENG
          </button>
        </div>
      </div>

      <Tip>{c.tip}</Tip>

      {/* Section 1 — Login */}
      <section className="mb-8">
        <SectionTitle>{c.s1}</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {c.login.map((item) => (
            <StepCard key={item.step} step={item.step} heading={item.heading} body={item.body} notes={item.notes} />
          ))}
        </div>
      </section>

      {/* Section 2 — Search */}
      <section className="mb-8">
        <SectionTitle>{c.s2}</SectionTitle>
        <div className="border border-gray-200 rounded-xl p-5 mb-3">
          <p className="text-sm text-gray-600 leading-relaxed">{c.searchBody}</p>
        </div>
        <Tip>{c.searchTip}</Tip>
      </section>

      {/* Section 3 — Dump */}
      <section className="mb-8">
        <SectionTitle>{c.s3}</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {c.dump.map((item) => (
            <StepCard key={item.step} step={item.step} heading={item.heading} body={item.body} />
          ))}
        </div>
        {/* Price box */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <div className="flex items-baseline gap-3 mb-1">
            <span className="text-xl font-semibold text-green-800">{c.priceNormal}</span>
            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">SALE</span>
          </div>
          <p className="text-sm text-green-700 mb-1">{c.priceSaleDates}</p>
          <p className="text-sm text-green-700">{c.priceDuration}</p>
        </div>
      </section>

      {/* Section 4 — Payment */}
      <section className="mb-8">
        <SectionTitle>{c.s4}</SectionTitle>
        <div className="border border-gray-200 rounded-xl p-5 mb-3">
          <ol className="list-decimal list-inside text-sm text-gray-600 leading-relaxed space-y-2">
            {c.paySteps.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
        </div>
        <Warning>{c.payWarn}</Warning>
      </section>

      {/* Section 5 — Subscriptions */}
      <section className="mb-8">
        <SectionTitle>{c.s5}</SectionTitle>
        <div className="border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-600 leading-relaxed mb-3">{c.subBody}</p>
          <ul className="list-disc list-inside text-sm text-gray-500 leading-relaxed space-y-1">
            {c.subNotes.map((n, i) => <li key={i}>{n}</li>)}
          </ul>
        </div>
      </section>

      {/* Section 6 — Practice */}
      <section className="mb-8">
        <SectionTitle>{c.s6}</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
          {c.practice.map((item) => (
            <StepCard key={item.step} step={item.step} heading={item.heading} body={item.body} notes={item.notes} />
          ))}
        </div>
        <Tip>{c.practiceTip}</Tip>
      </section>

      {/* FAQ */}
      <section className="mb-8">
        <SectionTitle>{c.s7}</SectionTitle>
        <div className="divide-y divide-gray-100">
          {c.faq.map((f, i) => (
            <div key={i} className="py-4">
              <p className="text-sm font-medium text-gray-800 mb-1">❓ {f.q}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="mb-4">
        <SectionTitle>{c.s8}</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {c.contacts.map((ct, i) => (
            <div key={i} className="border border-gray-200 rounded-xl p-5">
              <div className="text-2xl mb-3">{ct.emoji}</div>
              <h4 className="text-sm font-semibold text-gray-800 mb-2">{ct.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{ct.body}</p>
            </div>
          ))}
        </div>

        {/* Contact links */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-5">
          <p className="text-sm font-medium text-gray-700 mb-4">✉️ {c.contactSub}</p>
          <div className="flex flex-col gap-3">
            {CONTACT_LINKS.map((link) => (
              <div key={link.label} className="flex items-center gap-3">
                <span className="text-sm text-gray-500 w-20 flex-shrink-0">{link.label}</span>
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  {link.value}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
