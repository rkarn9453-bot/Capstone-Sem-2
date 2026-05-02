import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedCity } from "../store/airQualitySlice";
import { getAqiColor, getAqiGrade } from "../utils/helpers";

// memo = performance optimization — only re-renders if props change
const CityCard = memo(function CityCard({ city }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedCity = useSelector((s) => s.airQuality.selectedCity);
  const isSelected = selectedCity?.id === city.id;
  const color = getAqiColor(city.status);
  const grade = getAqiGrade(city.aqi);

  const handleClick = () => {
    dispatch(setSelectedCity(city));
  };

  const handleViewDetail = (e) => {
    e.stopPropagation();
    dispatch(setSelectedCity(city));
    navigate(`/city/${city.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative cursor-pointer rounded-2xl border p-4 card-hover animate-fade-in"
      style={{
        borderColor: isSelected ? color : "#1e293b",
        backgroundColor: isSelected ? `${color}15` : "#0f172a",
      }}
    >
      {/* Selected left bar */}
      {isSelected && (
        <div
          className="absolute left-0 top-0 h-full w-1 rounded-l-2xl"
          style={{ backgroundColor: color }}
        />
      )}

      {/* Top row: city name + AQI */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-white text-sm leading-tight">{city.city}</h3>
          <p className="text-slate-500 text-[10px] font-mono mt-0.5">{city.country}</p>
          <p className="text-[10px] mt-1 font-mono" style={{ color }}>{city.status}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-extrabold leading-none" style={{ color }}>
            {city.aqi}
          </p>
          <p className="text-slate-500 text-[10px] font-mono mt-1">
            Grade: <span style={{ color }}>{grade}</span>
          </p>
        </div>
      </div>

      {/* Pollutant mini stats */}
      <div className="grid grid-cols-3 gap-1.5 mb-3">
        {[["PM2.5", city.pm25], ["PM10", city.pm10], ["NO₂", city.no2]].map(([label, val]) => (
          <div key={label} className="bg-slate-950 rounded-lg px-2 py-1.5 text-center">
            <p className="text-[9px] text-slate-600 font-mono">{label}</p>
            <p className="text-xs font-bold text-slate-300">{val}</p>
          </div>
        ))}
      </div>

      {/* View Detail button */}
      <button
        onClick={handleViewDetail}
        className="w-full text-[10px] font-mono py-1.5 rounded-lg border transition-all hover:opacity-80"
        style={{ borderColor: `${color}44`, color, backgroundColor: `${color}10` }}
      >
        View Full Detail →
      </button>
    </div>
  );
});

export default CityCard;