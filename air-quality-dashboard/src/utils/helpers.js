import { AQI_CONFIG } from "../data/mockData";

// Get color for a given status
export const getAqiColor = (status) =>
  AQI_CONFIG[status]?.color || "#94a3b8";

// Get AQI letter grade
export const getAqiGrade = (aqi) => {
  if (aqi <= 50)  return "A";
  if (aqi <= 100) return "B";
  if (aqi <= 150) return "C";
  if (aqi <= 200) return "D";
  return "F";
};

// Get health advisory message
export const getHealthMessage = (aqi) => {
  if (aqi <= 50)  return "Air quality is satisfactory. Safe for all outdoor activities.";
  if (aqi <= 100) return "Acceptable. Unusually sensitive people should limit prolonged outdoor exertion.";
  if (aqi <= 150) return "Sensitive groups may experience health effects. Reduce outdoor activity.";
  if (aqi <= 200) return "Everyone may experience health effects. Limit outdoor exertion.";
  return "Health alert: everyone may experience serious effects. Stay indoors.";
};

// Get action tips based on AQI
export const getHealthTips = (aqi) => {
  if (aqi > 150) return ["Wear N95 mask", "Stay indoors", "Use air purifier", "Avoid exercise outside"];
  if (aqi > 100) return ["Wear a mask", "Limit outdoor time", "Keep windows closed"];
  return ["Safe to jog", "Open windows", "Great air today"];
};

// Simulate slight real-time variation
export const simulateRefresh = (cities) =>
  cities.map((city) => ({
    ...city,
    aqi: Math.max(10, city.aqi + Math.round((Math.random() - 0.5) * 12)),
  }));