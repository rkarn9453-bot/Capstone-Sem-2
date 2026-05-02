import { configureStore } from "@reduxjs/toolkit";
import airQualityReducer from "./airQualitySlice";

const store = configureStore({
  reducer: {
    airQuality: airQualityReducer,
  },
});

export default store;