import type { ComponentType, SVGProps } from 'react';
import { US, EU, RU } from 'country-flag-icons/react/3x2';
import type { CurrencyInfo, Rates } from '../types';

type FlagSVG = ComponentType<SVGProps<SVGSVGElement> & { title?: string }>;

// Currency code → SVG flag component mapping
const FLAGS: Record<string, FlagSVG> = {
  USD: US as FlagSVG,
  EUR: EU as FlagSVG,
  RUB: RU as FlagSVG,
};

interface CurrencyTableProps {
  currencies: CurrencyInfo[];
  rates: Rates;
}

export default function CurrencyTable({ currencies, rates }: CurrencyTableProps) {
  const fmt = (n: number) => n.toLocaleString('uz-UZ');

  return (
    <div className="w-full overflow-hidden rounded-2xl shadow-xl border border-orange-100">
      <table className="w-full">

        {/* ── Header ── */}
        <thead>
          <tr className="bg-orange-600 text-white">
            <th
              scope="col"
              className="py-5 xl:py-7 px-8 xl:px-16 text-left font-bold text-sm xl:text-lg uppercase tracking-widest align-middle"
            >
              Valyuta
            </th>
            <th
              scope="col"
              className="py-5 xl:py-7 px-8 xl:px-16 text-right font-bold text-sm xl:text-lg uppercase tracking-widest text-emerald-200 align-middle"
            >
              Sotib olish
            </th>
            <th
              scope="col"
              className="py-5 xl:py-7 px-8 xl:px-16 text-right font-bold text-sm xl:text-lg uppercase tracking-widest text-red-200 align-middle"
            >
              Sotish
            </th>
          </tr>
        </thead>

        {/* ── Rows ── */}
        <tbody className="divide-y divide-orange-100">
          {currencies.map((currency, i) => {
            const rate = rates[currency.code];
            const Flag = FLAGS[currency.code];
            return (
              <tr
                key={currency.code}
                className={`transition-colors duration-150 hover:bg-orange-50 ${
                  i % 2 === 0 ? 'bg-white' : 'bg-orange-50/40'
                }`}
              >
                {/* Currency info cell */}
                <td className="py-8 xl:py-14 px-8 xl:px-16 align-middle">
                  <div className="flex items-center gap-4 xl:gap-7">
                    {Flag && (
                      <Flag
                        title={currency.name}
                        className="w-12 xl:w-20 h-auto rounded-sm shadow-sm shrink-0"
                      />
                    )}
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-black text-slate-800 text-2xl xl:text-4xl leading-none">
                          {currency.code}
                        </span>
                        <span className="text-orange-400 font-bold text-base xl:text-2xl leading-none">
                          {currency.symbol}
                        </span>
                      </div>
                      <p className="text-slate-400 text-base xl:text-xl mt-1.5 xl:mt-2.5 leading-none">
                        {currency.name}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Buy price cell */}
                <td className="py-8 xl:py-14 px-8 xl:px-16 text-right align-middle">
                  <p className="text-3xl xl:text-6xl font-black text-emerald-600 tabular-nums leading-none">
                    {fmt(rate.buy)}
                  </p>
                  <p className="text-sm xl:text-xl text-slate-400 mt-2 xl:mt-3">so'm</p>
                </td>

                {/* Sell price cell */}
                <td className="py-8 xl:py-14 px-8 xl:px-16 text-right align-middle">
                  <p className="text-3xl xl:text-6xl font-black text-red-500 tabular-nums leading-none">
                    {fmt(rate.sell)}
                  </p>
                  <p className="text-sm xl:text-xl text-slate-400 mt-2 xl:mt-3">so'm</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
