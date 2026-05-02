import { memo, useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { getAqiColor } from "../utils/helpers";
import { generateHistory } from "../data/mockData";

const AqiLineChart = memo(function AqiLineChart({ aqi, status }) {
  const color = getAqiColor(status);
  // useMemo = performance optimization, don't regenerate on every render
  const data = useMemo(() => generateHistory(aqi), [aqi]);

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
      <h4 className="text-[11px] font-mono text-slate-500 uppercase tracking-widest mb-5">
        24h AQI Trend
      </h4>
      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis
            dataKey="time"
            tick={{ fill: "#475569", fontSize: 10, fontFamily: "DM Mono" }}
            axisLine={false} tickLine={false}
          />
          <YAxis
            tick={{ fill: "#475569", fontSize: 10, fontFamily: "DM Mono" }}
            axisLine={false} tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: 8,
              fontSize: 11,
              fontFamily: "DM Mono",
              color: "#f1f5f9",
            }}
          />
          <Line
            type="monotone" dataKey="aqi"
            stroke={color} strokeWidth={2.5}
            dot={false} activeDot={{ r: 5, fill: color }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});

export default AqiLineChart;