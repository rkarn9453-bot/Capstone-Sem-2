import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAirQuality, setSearch } from "../store/airQualitySlice";
import { useDebounce } from "../hooks/useDebounce";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const debounced = useDebounce(value, 600);

  useEffect(() => {
    dispatch(setSearch(debounced));
  }, [debounced, dispatch]);

  const handleSearch = () => {
    if (value.trim()) {
      dispatch(fetchAirQuality(value.trim()));
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none">
          🔍
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Search any city — Haryana, Mumbai, London…"
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-white text-sm placeholder-slate-600 outline-none focus:border-emerald-500/50 transition-all"
        />
        {value && (
          <button
            onClick={() => setValue("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors text-xs"
          >
            ✕
          </button>
        )}
      </div>
      <button
        onClick={handleSearch}
        className="px-4 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-sm font-mono hover:bg-emerald-500/30 transition-all whitespace-nowrap"
      >
        Search
      </button>
    </div>
  );
}