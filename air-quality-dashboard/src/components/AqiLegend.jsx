import { AQI_CONFIG } from "../data/mockData";

export default function AqiLegend() {
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
      <h4 className="text-[11px] font-mono text-slate-500 uppercase tracking-widest mb-4">
        AQI Scale Reference
      </h4>
      <div className="grid grid-cols-3 gap-2">
        {Object.entries(AQI_CONFIG).map(([status, cfg]) => (
          <div
            key={status}
            className="rounded-xl p-2.5 border"
            style={{
              backgroundColor: `${cfg.color}15`,
              borderColor: `${cfg.color}30`,
            }}
          >
            <p className="text-[9px] font-mono mb-0.5" style={{ color: cfg.color }}>
              {cfg.range}
            </p>
            <p className="text-white text-[11px] font-semibold leading-tight">{status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}