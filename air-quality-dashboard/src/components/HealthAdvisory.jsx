import { getAqiColor, getHealthMessage, getHealthTips } from "../utils/helpers";

export default function HealthAdvisory({ aqi, status }) {
  const color = getAqiColor(status);
  const message = getHealthMessage(aqi);
  const tips = getHealthTips(aqi);

  return (
    <div
      className="rounded-2xl border p-5"
      style={{ borderColor: `${color}33`, backgroundColor: `${color}12` }}
    >
      <h4 className="text-[11px] font-mono uppercase tracking-widest mb-3" style={{ color }}>
        ⚕️ Health Advisory
      </h4>
      <p className="text-slate-300 text-sm leading-relaxed mb-4">{message}</p>
      <div className="flex flex-wrap gap-2">
        {tips.map((tip) => (
          <span
            key={tip}
            className="px-3 py-1 rounded-full text-xs font-mono border"
            style={{
              color,
              borderColor: `${color}44`,
              backgroundColor: `${color}18`,
            }}
          >
            {tip}
          </span>
        ))}
      </div>
    </div>
  );
}