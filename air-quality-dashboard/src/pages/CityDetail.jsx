import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { lazy, Suspense } from "react";
import AqiGauge from "../components/AqiGauge";
import PollutantBars from "../components/PollutantBars";
import HealthAdvisory from "../components/HealthAdvisory";
import ErrorBoundary from "../components/ErrorBoundary";
import { getAqiColor, getAqiGrade } from "../utils/helpers";

const AqiLineChart = lazy(() => import("../components/AqiLineChart"));
const Pm25BarChart = lazy(() => import("../components/Pm25BarChart"));

export default function CityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cities = useSelector((s) => s.airQuality.cities);
  const city = cities.find((c) => c.id === Number(id));

  if (!city) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <p className="text-5xl mb-4">🌫️</p>
        <h2 className="text-xl font-bold text-white mb-2">City not found</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-sm font-mono hover:bg-emerald-500/30 transition-colors"
        >
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  const color = getAqiColor(city.status);
  const grade = getAqiGrade(city.aqi);

  return (
    <div className="max-w-3xl mx-auto px-5 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="mb-6 flex items-center gap-2 text-slate-400 text-sm font-mono hover:text-white transition-colors"
      >
        ← Back to Dashboard
      </button>

      {/* City Hero */}
      <div
        className="rounded-2xl border p-8 mb-5 flex flex-col sm:flex-row items-center justify-between gap-6"
        style={{ borderColor: `${color}33`, backgroundColor: `${color}10` }}
      >
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">{city.city}</h1>
          <p className="text-slate-400 font-mono mt-1">{city.country}</p>
          <div
            className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full border text-sm font-semibold"
            style={{ color, borderColor: `${color}44`, backgroundColor: `${color}18` }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: color }} />
            {city.status}
          </div>
          <p className="text-slate-400 text-xs font-mono mt-3">
            AQI Grade: <span className="font-bold" style={{ color }}>{grade}</span>
          </p>
        </div>
        <AqiGauge aqi={city.aqi} status={city.status} />
      </div>

      {/* All detailed data */}
      <div className="flex flex-col gap-4">
        <PollutantBars data={city} />
        <ErrorBoundary>
          <Suspense fallback={<div className="h-40 bg-slate-900 rounded-2xl animate-pulse" />}>
            <AqiLineChart aqi={city.aqi} status={city.status} />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<div className="h-32 bg-slate-900 rounded-2xl animate-pulse" />}>
            <Pm25BarChart aqi={city.aqi} />
          </Suspense>
        </ErrorBoundary>
        <HealthAdvisory aqi={city.aqi} status={city.status} />

        {/* Full stats table */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
          <h4 className="text-[11px] font-mono text-slate-500 uppercase tracking-widest mb-4">
            Full Data Table
          </h4>
          <table className="w-full text-sm font-mono">
            <thead>
              <tr className="text-slate-600 text-xs">
                <th className="text-left pb-3">Pollutant</th>
                <th className="text-right pb-3">Value</th>
                <th className="text-right pb-3">Unit</th>
                <th className="text-right pb-3">Level</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              {[
                ["AQI",  city.aqi,  "index", city.aqi > 150 ? "High" : city.aqi > 100 ? "Med" : "Low"],
                ["PM2.5",city.pm25,"µg/m³", city.pm25 > 55 ? "High" : city.pm25 > 12 ? "Med" : "Low"],
                ["PM10", city.pm10,"µg/m³", city.pm10 > 154 ? "High" : city.pm10 > 54 ? "Med" : "Low"],
                ["CO",   city.co,  "ppm",   city.co > 2 ? "High" : "Low"],
                ["NO₂",  city.no2, "µg/m³", city.no2 > 53 ? "High" : "Low"],
              ].map(([name, val, unit, level]) => (
                <tr key={name} className="border-t border-slate-800">
                  <td className="py-2.5">{name}</td>
                  <td className="text-right py-2.5 font-bold" style={{ color }}>{val}</td>
                  <td className="text-right py-2.5 text-slate-500">{unit}</td>
                  <td className="text-right py-2.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${
                      level === "High" ? "bg-red-500/20 text-red-400" :
                      level === "Med"  ? "bg-yellow-500/20 text-yellow-400" :
                                         "bg-green-500/20 text-green-400"
                    }`}>{level}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}