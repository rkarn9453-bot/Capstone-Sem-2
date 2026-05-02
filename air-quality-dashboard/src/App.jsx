import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { lazy, Suspense } from "react";
import Header from "./components/Header";
import ErrorBoundary from "./components/ErrorBoundary";
import { fetchAirQuality } from "./store/airQualitySlice";

// Lazy load pages for performance
const Dashboard  = lazy(() => import("./pages/Dashboard"));
const CityDetail = lazy(() => import("./pages/CityDetail"));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <span className="text-slate-600 font-mono text-sm animate-pulse">Loading…</span>
  </div>
);

export default function App() {
  const dispatch = useDispatch();

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchAirQuality());
    }, 30000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-white">
        <Header />
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/"          element={<Dashboard />} />
              <Route path="/city/:id"  element={<CityDetail />} />
              <Route path="*"          element={
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                  <p className="text-5xl mb-4">404</p>
                  <p className="text-slate-500 font-mono">Page not found</p>
                </div>
              } />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
    </BrowserRouter>
  );
}