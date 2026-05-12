import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogIn, LogOut, Save, ShieldCheck,
  CheckCircle, AlertCircle, X, CalendarDays, Clock,
} from 'lucide-react';
import { useRates } from '../hooks/useRates';
import type { Rates, CurrencyCode } from '../types';

const SESSION_KEY = 'mybank_admin_auth';

// ── Toast ──────────────────────────────────────────────────────────────────
function useToast() {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = (message: string, type: 'success' | 'error' = 'success') => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast({ message, type });
    timerRef.current = setTimeout(() => setToast(null), 3000);
  };

  return { toast, show, hide: () => setToast(null) };
}

// ── Login form ─────────────────────────────────────────────────────────────
function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    await new Promise((r) => setTimeout(r, 400));

    if (
      login === import.meta.env.VITE_ADMIN_LOGIN &&
      password === import.meta.env.VITE_ADMIN_PASSWORD
    ) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      onLogin();
    } else {
      setError("Login yoki parol noto'g'ri. Qayta urinib ko'ring.");
    }
    setLoading(false);
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-orange-100 overflow-hidden">
        <div className="bg-linear-to-r from-orange-500 to-orange-700 px-8 py-6 text-white text-center">
          <ShieldCheck className="w-10 h-10 mx-auto mb-2 opacity-90" />
          <h2 className="text-2xl font-black tracking-tight">Admin Panel</h2>
          <p className="text-orange-100 text-sm mt-1">Kirish uchun ma'lumotlarni kiriting</p>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
          {error && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Login</label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="admin"
              required
              autoComplete="username"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all text-slate-800 placeholder-slate-400"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Parol</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all text-slate-800 placeholder-slate-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow hover:shadow-md active:scale-95"
          >
            {loading
              ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              : <LogIn className="w-4 h-4" />}
            {loading ? 'Kirilmoqda...' : 'Kirish'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Dashboard ──────────────────────────────────────────────────────────────
const FIELDS: { key: CurrencyCode; label: string; flag: string; symbol: string }[] = [
  { key: 'USD', label: 'Dollar (USD)', flag: '🇺🇸', symbol: '$' },
  { key: 'EUR', label: 'Yevro (EUR)',  flag: '🇪🇺', symbol: '€' },
  { key: 'RUB', label: 'Rubl (RUB)',   flag: '🇷🇺', symbol: '₽' },
];

function deepCopy(r: Rates): Rates {
  return { USD: { ...r.USD }, EUR: { ...r.EUR }, RUB: { ...r.RUB } };
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const { rates, updatedAt, saveRates } = useRates();
  const { toast, show: showToast, hide: hideToast } = useToast();
  const [formValues, setFormValues] = useState<Rates>(() => deepCopy(rates));

  useEffect(() => {
    setFormValues(deepCopy(rates));
  }, [rates]);

  const handleChange = (key: CurrencyCode, side: 'buy' | 'sell', value: string) => {
    const num = Number(value);
    if (!isNaN(num) && num >= 0) {
      setFormValues((prev) => ({
        ...prev,
        [key]: { ...prev[key], [side]: num },
      }));
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const anyZero = FIELDS.some(
      ({ key }) => formValues[key].buy <= 0 || formValues[key].sell <= 0
    );
    if (anyZero) {
      showToast("Barcha kurslar 0 dan katta bo'lishi kerak!", 'error');
      return;
    }

    const sellBelowBuy = FIELDS.some(({ key }) => formValues[key].sell < formValues[key].buy);
    if (sellBelowBuy) {
      showToast("Sotish narxi sotib olish narxidan kichik bo'lmasligi kerak!", 'error');
      return;
    }

    saveRates(formValues);
    showToast('Kurslar muvaffaqiyatli saqlandi!', 'success');
  };

  const lastDt = updatedAt ? new Date(updatedAt) : null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-20 right-4 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg text-white text-sm font-semibold ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {toast.type === 'success'
            ? <CheckCircle className="w-5 h-5 shrink-0" />
            : <AlertCircle className="w-5 h-5 shrink-0" />}
          {toast.message}
          <button onClick={hideToast} className="ml-2 opacity-70 hover:opacity-100">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header row */}
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            Kurslarni Boshqarish
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Sotib olish va sotish kurslarini belgilang
          </p>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 border border-red-200 hover:border-red-300 rounded-xl transition-all duration-200 shrink-0"
        >
          <LogOut className="w-4 h-4" />
          Chiqish
        </button>
      </div>

      {/* Form card */}
      <form
        onSubmit={handleSave}
        className="bg-white rounded-2xl shadow-md border border-orange-50 p-6 sm:p-8 space-y-7"
      >
        {/* Column labels */}
        <div className="grid grid-cols-2 gap-3 pl-11">
          <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest text-center">
            Sotib olish
          </p>
          <p className="text-xs font-bold text-red-500 uppercase tracking-widest text-center">
            Sotish
          </p>
        </div>

        {FIELDS.map(({ key, label, flag, symbol }) => (
          <div key={key} className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <span className="text-xl">{flag}</span>
              {label}
            </label>
            <div className="grid grid-cols-2 gap-3">
              {/* Buy */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-base select-none pointer-events-none">
                  {symbol}
                </span>
                <input
                  type="number"
                  value={formValues[key].buy}
                  onChange={(e) => handleChange(key, 'buy', e.target.value)}
                  min={1}
                  step={1}
                  required
                  aria-label={`${key} sotib olish`}
                  className="w-full pl-8 pr-3 py-2.5 border border-emerald-200 focus:border-emerald-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 transition-all text-slate-800 font-semibold tabular-nums"
                />
              </div>
              {/* Sell */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-base select-none pointer-events-none">
                  {symbol}
                </span>
                <input
                  type="number"
                  value={formValues[key].sell}
                  onChange={(e) => handleChange(key, 'sell', e.target.value)}
                  min={1}
                  step={1}
                  required
                  aria-label={`${key} sotish`}
                  className="w-full pl-8 pr-3 py-2.5 border border-red-200 focus:border-red-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300 transition-all text-slate-800 font-semibold tabular-nums"
                />
              </div>
            </div>
          </div>
        ))}

        <div className="pt-1">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow hover:shadow-md active:scale-95 text-base"
          >
            <Save className="w-5 h-5" />
            Saqlash
          </button>
        </div>
      </form>

      {/* Saved rates preview */}
      <div className="mt-5 bg-orange-50 border border-orange-100 rounded-2xl p-5">
        {lastDt ? (
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-orange-100 flex-wrap gap-y-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <CalendarDays className="w-3.5 h-3.5 text-orange-400" />
              <span className="font-bold text-slate-700">
                {lastDt.toLocaleDateString('uz-UZ', {
                  day: '2-digit', month: '2-digit', year: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Clock className="w-3.5 h-3.5 text-orange-400" />
              <span className="font-bold text-orange-600">
                {lastDt.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">
              da saqlangan
            </span>
          </div>
        ) : (
          <p className="text-xs text-amber-600 font-semibold mb-4 pb-4 border-b border-orange-100">
            Hali saqlanmagan — default kurslar ko'rsatilmoqda
          </p>
        )}

        <p className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-3">
          Hozirgi saqlangan kurslar
        </p>
        <div className="grid grid-cols-3 gap-3">
          {FIELDS.map(({ key, flag }) => (
            <div key={key} className="text-center bg-white rounded-xl py-3 px-2 border border-orange-100">
              <span className="text-xl">{flag}</span>
              <p className="text-xs font-bold text-slate-600 mt-1 mb-2">{key}</p>
              <p className="text-xs text-emerald-600 font-bold tabular-nums">
                {rates[key].buy.toLocaleString('uz-UZ')}
              </p>
              <p className="text-xs text-red-500 font-bold tabular-nums">
                {rates[key].sell.toLocaleString('uz-UZ')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────
export default function Admin() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === 'true'
  );

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <div className="flex-1 flex flex-col">
      {isAuthenticated ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <LoginForm onLogin={() => setIsAuthenticated(true)} />
      )}
    </div>
  );
}
