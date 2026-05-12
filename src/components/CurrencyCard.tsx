import type { CurrencyInfo, Rates } from "../types";

interface CurrencyTableProps {
  currencies: CurrencyInfo[];
  rates: Rates;
}

export default function CurrencyTable({
  currencies,
  rates,
}: CurrencyTableProps) {
  const fmt = (n: number) => n.toLocaleString("uz-UZ");

  return (
    <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-xl border border-orange-100">
      <table className="w-full">
        {/* ── Header ── */}
        <thead>
          <tr className="bg-orange-600 text-white">
            <th
              scope="col"
              className="py-5 px-8 text-left font-bold text-sm uppercase tracking-widest"
            >
              Valyuta
            </th>
            <th
              scope="col"
              className="py-5 px-8 text-right font-bold text-sm uppercase tracking-widest text-emerald-200"
            >
              Sotib olish
            </th>
            <th
              scope="col"
              className="py-5 px-8 text-right font-bold text-sm uppercase tracking-widest text-red-200"
            >
              Sotish
            </th>
          </tr>
        </thead>

        {/* ── Rows ── */}
        <tbody className="divide-y divide-orange-100">
          {currencies.map((currency, i) => {
            const rate = rates[currency.code];
            return (
              <tr
                key={currency.code}
                className={`transition-colors duration-150 hover:bg-orange-50 ${
                  i % 2 === 0 ? "bg-white" : "bg-orange-50/40"
                }`}
              >
                {/* Currency info cell */}
                <td className="py-8 px-8">
                  <div className="flex items-center gap-4">
                    <span
                      className="text-4xl leading-none shrink-0"
                      role="img"
                      aria-label={currency.name}
                    >
                      {currency.flag}
                    </span>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-black text-slate-800 text-2xl leading-none">
                          {currency.code}
                        </span>
                        <span className="text-orange-400 font-bold text-base leading-none">
                          {currency.symbol}
                        </span>
                      </div>
                      <p className="text-slate-400 text-base mt-1.5 leading-none">
                        {currency.name}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Buy price cell */}
                <td className="py-8 px-8 text-right">
                  <p className="text-3xl font-black text-emerald-600 tabular-nums leading-none">
                    {fmt(rate.buy)}
                  </p>
                  <p className="text-sm text-slate-400 mt-2">so'm</p>
                </td>

                {/* Sell price cell */}
                <td className="py-8 px-8 text-right">
                  <p className="text-3xl font-black text-red-500 tabular-nums leading-none">
                    {fmt(rate.sell)}
                  </p>
                  <p className="text-sm text-slate-400 mt-2">so'm</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
