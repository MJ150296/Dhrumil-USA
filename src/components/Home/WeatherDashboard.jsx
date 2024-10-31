import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MapComponent from "../MapComponent.jsx"
import { BackButtonContext, WeatherContext } from "../../App";

function WeatherDashboard() {
  const [isBackButtonClicked, setIsBackButtonClicked] =
    useContext(BackButtonContext);
  const [position, setPosition] = useContext(WeatherContext);
  const [isPrevious, setIsPrevious] = useState(false);
  const [isForecast, setIsForecast] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [jsonData, setJsonData] = useState(null);
  const [isScrollActive, setIsScrollActive] = useState(false);
  const scrollingRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { cityName, state } = location.state || {};

  // ReverseGeocode function
  const reverseGeocode = async (lat, lng) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`
    );
    const data = await response.json();
    if (data && data.address) {
      navigate("/dashboard", {
        state: {
          cityName: data.address.city || data.address.town || "Unknown",
          state: data.address.state || "Unknown",
        },
      });
    } else {
      console.log("City not found");
    }
  };

  useEffect(() => {
    if (!isBackButtonClicked && position) {
      const { latitude, longitude } = position;
      reverseGeocode(latitude, longitude);
    }
    setIsBackButtonClicked(false);
  }, [position]);

  const handleBack = () => {
    setIsBackButtonClicked(true);
    navigate("/");
  };

  const handlePreviousWeather = () => {
    setIsPrevious(true);
    setIsForecast(false);
    setIsScrollActive(true);
  };

  const handleForecastWeather = () => {
    setIsForecast(true);
    setIsPrevious(false);
    setIsScrollActive(true);
  };

  useEffect(() => {
    if (isScrollActive && scrollingRef.current) {
      window.scrollTo({
        top: scrollingRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  }, [isScrollActive]);

  const fetchJsonFromCloudinary = async (url, isPrevious) => {
    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      const requiredData = data.filter((entry) => entry.date === startDate);
      setJsonData(requiredData[0]);
      navigate("/dashboard", {
        state: { data: requiredData[0], city: cityName, state, isPrevious },
      });
    } catch (error) {
      console.error("Error fetching JSON from Cloudinary:", error);
    }
  };

  const handlePreviousFetch = () => {
    const url =
      "https://res.cloudinary.com/dzmjjm2kn/raw/upload/v1728677086/past_daily_p8vkit.json";
    fetchJsonFromCloudinary(url, true);
  };

  const handleForecastFetch = () => {
    const url =
      "https://res.cloudinary.com/dzmjjm2kn/raw/upload/v1728763418/forecast_daily_ahkerg.json";
    fetchJsonFromCloudinary(url, false);
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#273D5A] text-white">
      {/* Search Bar and Map */}
      <div className="w-full flex justify-center bg-[#1E293B] py-5">
        <input
          type="text"
          className="w-2/3 p-3 rounded-lg text-black"
          placeholder="Search for a location..."
        />
      </div>
      <div className="w-full h-96">
        <MapComponent />
      </div>

      {/* City and State Display */}
      <div className="w-full flex justify-center py-5">
        <h1 className="text-5xl font-bold">
          {cityName ? `${cityName}, ${state}` : "Select a Location"}
        </h1>
      </div>

      {/* Weather Buttons */}
      <div className="w-full flex justify-center gap-10 py-5">
        <button
          className="bg-gradient-to-r from-blue-300 to-blue-500 text-black py-3 px-6 rounded-xl shadow-lg text-2xl hover:scale-105 transform transition duration-300"
          onClick={handlePreviousWeather}
        >
          Previous Weather ⛅
        </button>
        <button
          className="bg-gradient-to-r from-green-300 to-green-400 text-black py-3 px-6 rounded-xl shadow-lg text-2xl hover:scale-105 transform transition duration-300"
          onClick={handleForecastWeather}
        >
          Forecast Weather 🌦️
        </button>
      </div>

      {/* Weather Data Fetching */}
      <div ref={scrollingRef} className="w-full py-10">
        {isPrevious && (
          <div className="w-full flex flex-col items-center">
            <h2 className="text-3xl mb-5">Select Date for Previous Weather</h2>
            <input
              type="date"
              className="text-black p-2 rounded-lg"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min="2022-01-01"
              max="2023-05-31"
            />
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-5"
              onClick={handlePreviousFetch}
            >
              Fetch Previous Data
            </button>
          </div>
        )}

        {isForecast && (
          <div className="w-full flex flex-col items-center">
            <h2 className="text-3xl mb-5">Select Date for Forecast</h2>
            <input
              type="date"
              className="text-black p-2 rounded-lg"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min="2023-06-01"
              max="2023-10-31"
            />
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-lg mt-5"
              onClick={handleForecastFetch}
            >
              Fetch Forecast Data
            </button>
          </div>
        )}
      </div>

      {/* Back Button */}
      <div className="w-full flex justify-center py-5">
        <button
          className="bg-gradient-to-r from-orange-300 to-orange-500 text-black py-3 px-6 rounded-xl shadow-lg text-2xl hover:scale-105 transform transition duration-300"
          onClick={handleBack}
        >
          Back to Map 🗺️
        </button>
      </div>
    </div>
  );
}

export default WeatherDashboard;
