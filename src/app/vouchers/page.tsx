import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default async function VoucherPage() {
  const snap = await getDocs(collection(db, "vouchers"));

  const providers = snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="bg-gray-50 py-8 text-center">
        <h1 className="text-4xl font-bold mb-2">
          Exam Vouchers
        </h1>

        <p className="text-sm text-gray-500 max-w-2xl mx-auto mb-4 leading-relaxed">
          Exam vouchers availability are subject to change over time and may depend on its validity period. 
          <br /> 
          Kindly contact us to confirm current availability.
        </p>

        <p className="text-sm text-gray-700">
          📞 Contact us:&nbsp;
          <span className="font-medium">
            Email | Zalo | Facebook | Hotline
          </span>
        </p>
      </section>

      {/* ================= LIST ================= */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {providers.map((provider: any) => (
          <div key={provider.id} className="mb-14">
            {/* Provider header */}
            <h2 className="text-xl font-bold uppercase mb-4">
              {provider.providerName}
            </h2>

            {/* Table */}
            <div className="overflow-x-auto border rounded-lg">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-3 py-2">
                      Track
                    </th>
                    <th className="border px-3 py-2 text-left">
                      Exam
                    </th>
                    <th className="border px-3 py-2">
                      Exam Price (USD)
                    </th>
                    <th className="border px-3 py-2">
                      Voucher Discount (USD)
                    </th>
                    <th className="border px-3 py-2">
                      Price (VND)
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {Object.entries(provider.tracks).flatMap(
                    ([trackId, track]: any) =>
                      track.items.map((item: any) => (
                        <tr
                          className="hover:bg-gray-50"
                        >
                          <td className="border px-3 py-2">
                            {track.name}
                          </td>

                          <td className="border px-3 py-2">
                            {item.title}
                          </td>

                          <td className="border px-3 py-2 text-center">
                            ${item.examPriceUsd}
                          </td>

                          <td className="border px-3 py-2 text-center">
                            ${item.voucherPriceUsd}
                          </td>

                          <td className="border px-3 py-2 text-center text-green-600 font-medium">
                            {item.priceVnd.toLocaleString()} đ
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
