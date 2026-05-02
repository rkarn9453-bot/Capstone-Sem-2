import { memo, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { generateHistory } from "../data/mockData";

const Pm25BarChart = memo(function Pm25BarChart({ aqi }) {
  const data = useMemo(() => generateHistory(aqi), [aqi]);

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
      <h4 className="text-[11px] font-mono text-slate-500 uppercase tracking-widest mb-5">
        24h PM2.5 Distribution
      </h4>
      <ResponsiveContainer width="100%" height={130}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis
            dataKey="time"
            tick={{ fill: "#475569", fontSize: 9, fontFamily: "DM Mono" }}
            axisLine={false} tickLine={false}
          />
          <YAxis
            tick={{ fill: "#475569", fontSize: 9, fontFamily: "DM Mono" }}
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
          <Bar dataKey="pm25" fill="#f97316" radius={[3, 3, 0, 0]} opacity={0.85} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

export default Pm25BarChart;