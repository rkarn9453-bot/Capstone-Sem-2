import { useSelector } from "react-redux";
import { lazy, Suspense } from "react";
import { selectFilteredCities } from "../store/airQualitySlice";
import SearchBar from "../components/SearchBar";
import FilterSort from "../components/FilterSort";
import CityCard from "../components/CityCard";
import Pagination from "../components/Pagination";
import AqiGauge from "../components/AqiGauge";
import PollutantBars from "../components/PollutantBars";
import HealthAdvisory from "../components/HealthAdvisory";
import AqiLegend from "../components/AqiLegend";
import ErrorBoundary from "../components/ErrorBoundary";
import { getAqiColor } from "../utils/helpers";

// Lazy load charts = better performance (code splitting)
const AqiLineChart = lazy(() => import("../components/AqiLineChart"));
const Pm25BarChart = lazy(() => import("../components/Pm25BarChart"));

const ChartLoader = () => (
  <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 flex items-center justify-center h-40">
    <span className="text-slate-600 text-sm font-mono animate-pulse">Loading chart…</span>
  </div>
);

export default function Dashboard() {
  const { selectedCity, page, perPage, error } = useSelector((s) => s.airQuality);
  const filtered = useSelector(selectFilteredCities);
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice(page * perPage, page * perPage + perPage);
  const color = getAqiColor(selectedCity?.status);

  return (
    <div className="max-w-screen-xl mx-auto px-5 py-6 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-5">

      {/* ─── LEFT: City List ─── */}
      <div className="flex flex-col gap-4">
        <SearchBar />
        <FilterSort />

        {/* Error banner */}
        {error && (
          <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
            ⚠️ {error}
          </div>
        )}

        {/* City Cards */}
        <div className="flex flex-col gap-3">
          {paginated.map((city) => (
            <ErrorBoundary key={city.id}>
              <CityCard city={city} />
            </ErrorBoundary>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-600 text-sm font-mono">
              No cities match your search.
            </div>
          )}
        </div>

        <Pagination total={totalPages} />
      </div>

      {/* ─── RIGHT: Detail Panel ─── */}
      {selectedCity && (
        <div className="flex flex-col gap-4">

          {/* City header */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                {selectedCity.city}
              </h2>
              <p className="text-slate-500 text-sm font-mono mt-1">{selectedCity.country}</p>

              {/* Status badge */}
              <div
                className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full border text-xs font-semibold"
                style={{ color, borderColor: `${color}44`, backgroundColor: `${color}18` }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse-slow"
                  style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
                />
                {selectedCity.status}
              </div>

              {/* CO + NO2 quick stats */}
              <div className="flex gap-6 mt-4">
                {[["CO", selectedCity.co, "ppm"], ["NO₂", selectedCity.no2, "µg/m³"]].map(([label, val, unit]) => (
                  <div key={label}>
                    <p className="text-[10px] text-slate-500 font-mono">{label}</p>
                    <p className="text-xl font-bold" style={{ color }}>
                      {val}
                      <span className="text-xs text-slate-500 ml-1">{unit}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Gauge */}
            <AqiGauge aqi={selectedCity.aqi} status={selectedCity.status} />
          </div>

          {/* Pollutant bars */}
          <PollutantBars data={selectedCity} />

          {/* Charts — lazy loaded */}
          <ErrorBoundary>
            <Suspense fallback={<ChartLoader />}>
              <AqiLineChart aqi={selectedCity.aqi} status={selectedCity.status} />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<ChartLoader />}>
              <Pm25BarChart aqi={selectedCity.aqi} />
            </Suspense>
          </ErrorBoundary>

          {/* Health advisory */}
          <HealthAdvisory aqi={selectedCity.aqi} status={selectedCity.status} />

          {/* AQI Legend */}
          <AqiLegend />
        </div>
      )}
    </div>
  );
}