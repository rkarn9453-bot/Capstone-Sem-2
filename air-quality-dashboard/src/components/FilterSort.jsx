import { useDispatch, useSelector } from "react-redux";
import { setFilter, setSortBy, toggleSortDir } from "../store/airQualitySlice";
import { CITIES_DATA } from "../data/mockData";

const STATUSES = ["All", ...new Set(CITIES_DATA.map((c) => c.status))];

export default function FilterSort() {
  const dispatch = useDispatch();
  const { filter, sortBy, sortDir } = useSelector((s) => s.airQuality);

  return (
    <div className="flex gap-2">
      {/* Status Filter */}
      <select
        value={filter}
        onChange={(e) => dispatch(setFilter(e.target.value))}
        className="flex-1 px-3 py-2 rounded-lg border border-slate-800 bg-slate-900 text-white text-xs font-mono outline-none focus:border-emerald-500/50 transition-colors cursor-pointer"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      {/* Sort By */}
      <select
        value={sortBy}
        onChange={(e) => dispatch(setSortBy(e.target.value))}
        className="flex-1 px-3 py-2 rounded-lg border border-slate-800 bg-slate-900 text-white text-xs font-mono outline-none focus:border-emerald-500/50 transition-colors cursor-pointer"
      >
        <option value="aqi">Sort: AQI</option>
        <option value="pm25">Sort: PM2.5</option>
        <option value="no2">Sort: NO₂</option>
        <option value="co">Sort: CO</option>
      </select>

      {/* Sort Direction */}
      <button
        onClick={() => dispatch(toggleSortDir())}
        className="px-3 py-2 rounded-lg border border-slate-800 bg-slate-900 text-white hover:border-slate-600 transition-colors font-mono text-sm"
        title={sortDir === "desc" ? "Descending" : "Ascending"}
      >
        {sortDir === "desc" ? "↓" : "↑"}
      </button>
    </div>
  );
}