import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../store/airQualitySlice";

export default function Pagination({ total }) {
  const dispatch = useDispatch();
  const { page } = useSelector((s) => s.airQuality);

  if (total <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 py-2">
      <button
        onClick={() => dispatch(setPage(Math.max(0, page - 1)))}
        disabled={page === 0}
        className="px-3 py-1.5 rounded-lg border border-slate-800 text-slate-400 text-xs font-mono hover:border-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        ← Prev
      </button>

      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => dispatch(setPage(i))}
          className="w-8 h-8 rounded-lg border text-xs font-mono transition-all"
          style={{
            borderColor: i === page ? "#22c55e" : "#1e293b",
            backgroundColor: i === page ? "#22c55e20" : "transparent",
            color: i === page ? "#22c55e" : "#64748b",
          }}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => dispatch(setPage(Math.min(total - 1, page + 1)))}
        disabled={page === total - 1}
        className="px-3 py-1.5 rounded-lg border border-slate-800 text-slate-400 text-xs font-mono hover:border-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        Next →
      </button>
    </div>
  );
}