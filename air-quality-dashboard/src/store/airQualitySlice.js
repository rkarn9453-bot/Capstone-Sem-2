import { createSlice } from "@reduxjs/toolkit";
import { CITIES_DATA } from "../data/mockData";

function getStatus(aqi) {
  if (aqi <= 50)  return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
}

// Convert OWM 1-5 scale to AQI 0-300
function owmToAqi(owmAqi) {
  const map = { 1: 25, 2: 75, 3: 125, 4: 175, 5: 250 };
  return map[owmAqi] || 0;
}

const airQualitySlice = createSlice({
  name: "airQuality",
  initialState: {
    cities: CITIES_DATA,
    selectedCity: CITIES_DATA[0],
    search: "",
    filter: "All",
    sortBy: "aqi",
    sortDir: "desc",
    page: 0,
    perPage: 6,
    lastRefresh: new Date().toISOString(),
    refreshing: false,
    error: null,
  },
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
      state.page = 0;
    },
    setFilter(state, action) {
      state.filter = action.payload;
      state.page = 0;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    setSortDir(state, action) {
      state.sortDir = action.payload;
    },
    toggleSortDir(state) {
      state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setSelectedCity(state, action) {
      state.selectedCity = action.payload;
    },
    startRefresh(state) {
      state.refreshing = true;
      state.error = null;
    },
    refreshSuccess(state, action) {
      state.cities = action.payload;
      state.refreshing = false;
      state.lastRefresh = new Date().toISOString();
      const updated = action.payload.find(
        (c) => c.id === state.selectedCity?.id
      );
      if (updated) state.selectedCity = updated;
    },
    refreshError(state, action) {
      state.refreshing = false;
      state.error = action.payload;
    },
  },
});

export const {
  setSearch, setFilter, setSortBy, setSortDir, toggleSortDir,
  setPage, setSelectedCity, startRefresh, refreshSuccess, refreshError,
} = airQualitySlice.actions;

export default airQualitySlice.reducer;

// ── THUNK: Search any city, state or country ──
export const fetchAirQuality = (placeName = "Delhi") => async (dispatch) => {
  dispatch(startRefresh());
  try {
    const owmKey = import.meta.env.VITE_OWM_KEY;

    // Step 1: Convert place name → coordinates using Geocoding API
    const geoRes = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(placeName)}&limit=1&appid=${owmKey}`
    );
    const geoData = await geoRes.json();
    if (!geoData.length) throw new Error("Location not found. Try a different query.");
    const { lat, lon, name, country, state } = geoData[0];

    // Step 2: Get air quality using coordinates
    const aqRes = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${owmKey}`
    );
    const aqData = await aqRes.json();

    const components = aqData.list[0].components;
    const owmAqiLevel = aqData.list[0].main.aqi;
    const aqi = owmToAqi(owmAqiLevel);

    const cityObj = {
      id: Math.random(),
      city: name,
      country: state ? `${state}, ${country}` : country,
      aqi,
      pm25: Math.round(components.pm2_5 ?? 0),
      pm10: Math.round(components.pm10  ?? 0),
      co:   parseFloat((components.co / 1000).toFixed(2)), // convert µg/m³ to mg/m³
      no2:  Math.round(components.no2   ?? 0),
      status: getStatus(aqi),
    };

    dispatch(refreshSuccess([cityObj]));
    dispatch(setSelectedCity(cityObj));

  } catch (err) {
    dispatch(refreshError(err.message || "Something went wrong. Try again."));
  }
};

// ── Selectors ──
export const selectFilteredCities = (state) => {
  const { cities, search, filter, sortBy, sortDir } = state.airQuality;

  return cities
    .filter((c) =>
      c.city.toLowerCase().includes(search.toLowerCase()) ||
      c.country.toLowerCase().includes(search.toLowerCase())
    )
    .filter((c) => filter === "All" || c.status === filter)
    .slice()
    .sort((a, b) => {
      const dir = sortDir === "desc" ? -1 : 1;
      return (a[sortBy] - b[sortBy]) * dir;
    });
};