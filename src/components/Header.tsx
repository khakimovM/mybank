import { Maximize2, Minimize2, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

interface HeaderProps {
  isFocusMode: boolean;
  onToggleFocusMode: () => void;
  showAdminButton?: boolean;
}

export default function Header({
  isFocusMode,
  onToggleFocusMode,
  showAdminButton = true,
}: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo + Brand name */}
        <div className="flex items-center gap-3">
          <Logo />

          <span className="text-2xl font-black text-slate-800 tracking-tight select-none transition-all duration-300">
            mybank
          </span>
        </div>

        {/* Right-side controls */}
        <div className="flex items-center gap-2">
          {/* Focus mode toggle */}
          <button
            onClick={onToggleFocusMode}
            className="p-2 rounded-lg text-orange-500 hover:bg-orange-50 transition-all duration-200"
            title={isFocusMode ? "Oddiy rejim" : "To'liq ekran rejimi"}
            aria-label={isFocusMode ? "Oddiy rejim" : "To'liq ekran rejimi"}
          >
            {isFocusMode ? (
              <Minimize2 className="w-5 h-5" />
            ) : (
              <Maximize2 className="w-5 h-5" />
            )}
          </button>

          {/* Admin button */}
          {showAdminButton && !isFocusMode && (
            <button
              onClick={() => navigate("/admin")}
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded-lg shadow transition-all duration-200 hover:shadow-md active:scale-95"
            >
              <ShieldCheck className="w-4 h-4" />
              Admin Panel
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
