import { CalendarDays, Clock } from "lucide-react";
import CurrencyTable from "../components/CurrencyCard";
import { useRates } from "../hooks/useRates";
import type { CurrencyInfo } from "../types";

const CURRENCIES: CurrencyInfo[] = [
  { code: "USD", name: "Dollar", flag: "🇺🇸", symbol: "$" },
  { code: "EUR", name: "Yevro", flag: "🇪🇺", symbol: "€" },
  { code: "RUB", name: "Rubl", flag: "🇷🇺", symbol: "₽" },
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
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Heading */}
        <div className="text-center mb-8">
          {/* <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <TrendingUp className="w-4 h-4" />
            Joriy valyuta kurslari
          </div> */}
          <h1 className="text-4xl sm:text-5xl font-black text-slate-800 mb-5 tracking-tight">
            Valyuta Kurslari
          </h1>

          {/* Last-update timestamp */}
          {dt ? (
            <div className="inline-flex items-stretch bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="flex items-center gap-2.5 px-5 py-3 border-r border-slate-100">
                <CalendarDays className="w-4 h-4 text-orange-500 shrink-0" />
                <div className="text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
                    Sana
                  </p>
                  <p className="text-base font-black text-slate-800 tabular-nums leading-none">
                    {dt.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 px-5 py-3">
                <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                <div className="text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
                    Vaqt
                  </p>
                  <p className="text-base font-black text-orange-600 tabular-nums leading-none">
                    {dt.time}
                  </p>
                </div>
              </div>
              <div className="flex items-center px-4 bg-orange-50 border-l border-orange-100">
                <span className="text-[11px] font-semibold text-orange-500 leading-tight text-center">
                  Oxirgi
                  <br />
                  yangilanish
                </span>
              </div>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-5 py-2.5 rounded-xl text-sm font-semibold">
              <Clock className="w-4 h-4" />
              Kurslar hali admin tomonidan yangilanmagan
            </div>
          )}
        </div>

        {/* Exchange rate table */}
        <CurrencyTable currencies={CURRENCIES} rates={rates} />

        {/* <p className="text-center text-slate-400 text-sm mt-8">
          Kurslar My Bank tomonidan belgilanadi. Rasmiy kurs uchun{" "}
          <abbr title="O'zbekiston Respublikasi Markaziy Banki">O'zMB</abbr>{" "}
          saytiga murojaat qiling.
        </p> */}
      </div>
    </main>
  );
}
