import { getAqiColor } from "../utils/helpers";

export default function AqiGauge({ aqi, status }) {
  const color = getAqiColor(status);
  const radius = 70;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(100, (aqi / 300) * 100);
  const arcLength = (pct / 100) * circumference * 0.75;
  const startOffset = -(circumference * 0.125);

  return (
    <div className="flex flex-col items-center">
      <svg width={190} height={145} viewBox="0 0 190 145">
        {/* Track */}
        <circle
          cx={95} cy={115} r={radius}
          fill="none" stroke="#1e293b" strokeWidth={strokeWidth}
          strokeDasharray={`${circumference * 0.75} ${circumference}`}
          strokeDashoffset={startOffset}
          strokeLinecap="round"
        />
        {/* Fill */}
        <circle
          cx={95} cy={115} r={radius}
          fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeDashoffset={startOffset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dasharray 1.2s ease, stroke 0.5s ease",
            filter: `drop-shadow(0 0 8px ${color}99)`,
          }}
        />
        {/* AQI value */}
        <text x={95} y={112} textAnchor="middle" fill={color}
          fontSize={38} fontWeight={800} fontFamily="'Syne', sans-serif">
          {aqi}
        </text>
        {/* Label */}
        <text x={95} y={132} textAnchor="middle" fill="#475569"
          fontSize={11} fontFamily="'DM Mono', monospace">
          AQI INDEX
        </text>
      </svg>
    </div>
  );
}