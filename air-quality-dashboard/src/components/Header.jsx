import { useDispatch, useSelector } from "react-redux";
import { fetchAirQuality } from "../store/airQualitySlice";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const dispatch = useDispatch();
  const { refreshing, lastRefresh } = useSelector((s) => s.airQuality);
  const { dark, toggleTheme } = useTheme();

  const handleRefresh = () => dispatch(fetchAirQuality());

  const timeStr = new Date(lastRefresh).toLocaleTimeString();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800 px-6 py-3 flex items-center justify-between">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-lg shadow-lg shadow-emerald-500/20">
          🌿
        </div>
        <div>
          <h1 className="font-display font-extrabold text-white text-base leading-none tracking-tight">
            AirWatch
          </h1>
          <p className="text-slate-500 text-[10px] font-mono mt-0.5">
            Real-Time Air Quality Monitor
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        {/* Last refresh time */}
        <span className={`text-[11px] font-mono hidden sm:block ${refreshing ? "text-emerald-400 animate-pulse" : "text-slate-600"}`}>
          {refreshing ? "⟳ Refreshing..." : `↻ ${timeStr}`}
        </span>

        {/* Refresh button */}
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 text-xs font-mono hover:border-emerald-500/50 hover:text-emerald-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {refreshing ? "..." : "Refresh"}
        </button>

        {/* Dark mode toggle */}
        <button
          onClick={toggleTheme}
          className="w-8 h-8 rounded-lg border border-slate-700 flex items-center justify-center hover:border-slate-500 transition-colors"
          title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {dark ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}