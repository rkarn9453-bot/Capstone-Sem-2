import { memo } from "react";

// Individual bar row
function Bar({ label, value, max, color, unit = "µg/m³" }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between text-xs font-mono mb-1.5">
        <span className="text-slate-500">{label}</span>
        <span style={{ color }}>{value} {unit}</span>
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

const PollutantBars = memo(function PollutantBars({ data }) {
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
      <h4 className="text-[11px] font-mono text-slate-500 uppercase tracking-widest mb-5">
        Pollutant Levels
      </h4>
      <Bar label="PM2.5 (Fine Particles)" value={data.pm25} max={150} color="#f97316" />
      <Bar label="PM10 (Coarse Particles)" value={data.pm10} max={200} color="#eab308" />
      <Bar label="CO (Carbon Monoxide)"   value={data.co}   max={10}  color="#3b82f6" unit="ppm" />
      <Bar label="NO₂ (Nitrogen Dioxide)" value={data.no2}  max={100} color="#a855f7" />
    </div>
  );
});

export default PollutantBars;