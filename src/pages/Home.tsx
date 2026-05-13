import { CalendarDays, Clock } from "lucide-react";
import CurrencyTable from "../components/CurrencyCard";
import { useRates } from "../hooks/useRates";
import type { CurrencyInfo } from "../types";

const CURRENCIES: CurrencyInfo[] = [
  { code: "USD", name: "Dollar", symbol: "$" },
  { code: "EUR", name: "Yevro",  symbol: "€" },
  { code: "RUB", name: "Rubl",   symbol: "₽" },
];

function formatDateTime(iso: string | null) {
  if (!iso) return null;
  const d = new Date(iso);
  const date = d.toLocaleDateString("uz-UZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const time = d.toLocaleTimeString("uz-UZ", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return { date, time };
}

export default function Home() {
  const { rates, updatedAt } = useRates();
  const dt = formatDateTime(updatedAt);

  return (
    <main className="flex-1 bg-linear-to-br from-slate-50 via-orange-50/30 to-amber-50/20">
      {/* Outer container: 92vw so it fills large TV screens */}
      <div className="w-[92vw] mx-auto py-8 xl:py-12">

        {/* Heading */}
        <div className="text-center mb-8 xl:mb-10">
          <h1 className="text-4xl sm:text-5xl xl:text-7xl font-black text-slate-800 mb-5 xl:mb-7 tracking-tight">
            Valyuta Kurslari
          </h1>

          {/* Last-update timestamp */}
          {dt ? (
            <div className="inline-flex items-stretch bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="flex items-center gap-2.5 xl:gap-4 px-5 xl:px-7 py-3 xl:py-4 border-r border-slate-100">
                <CalendarDays className="w-4 xl:w-6 h-4 xl:h-6 text-orange-500 shrink-0" />
                <div className="text-left">
                  <p className="text-[10px] xl:text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
                    Sana
                  </p>
                  <p className="text-base xl:text-xl font-black text-slate-800 tabular-nums leading-none">
                    {dt.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 xl:gap-4 px-5 xl:px-7 py-3 xl:py-4">
                <Clock className="w-4 xl:w-6 h-4 xl:h-6 text-orange-500 shrink-0" />
                <div className="text-left">
                  <p className="text-[10px] xl:text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
                    Vaqt
                  </p>
                  <p className="text-base xl:text-xl font-black text-orange-600 tabular-nums leading-none">
                    {dt.time}
                  </p>
                </div>
              </div>
              <div className="flex items-center px-4 xl:px-6 bg-orange-50 border-l border-orange-100">
                <span className="text-[11px] xl:text-sm font-semibold text-orange-500 leading-tight text-center">
                  Oxirgi<br />yangilanish
                </span>
              </div>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-5 xl:px-7 py-2.5 xl:py-3.5 rounded-xl text-sm xl:text-base font-semibold">
              <Clock className="w-4 xl:w-5 h-4 xl:h-5" />
              Kurslar hali admin tomonidan yangilanmagan
            </div>
          )}
        </div>

        {/* Exchange rate table — fills full container width */}
        <CurrencyTable currencies={CURRENCIES} rates={rates} />
      </div>
    </main>
  );
}
