import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import OptionsPage from "./components/OptionsPage.jsx";
import OptionsPage1 from "./components/OptionsPage1.jsx";
import EnvironmentalChart from "./components/EnvironmentalChart.jsx";
import Dashboard from "./components/Dashboard.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="options" element={<OptionsPage1 />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="chart" element={<EnvironmentalChart />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
