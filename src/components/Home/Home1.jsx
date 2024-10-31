import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MapComponent from "../MapComponent"; // Map goes here
import { BackButtonContext, WeatherContext } from "../../App";

const Home1 = () => {
  const [isBackButtonClicked, setIsBackButtonClicked] =
    useContext(BackButtonContext);
  const [position, setPosition] = useContext(WeatherContext);
  const [startDate, setStartDate] = useState("");
  const [jsonData, setJsonData] = useState(null);
  const [isPrevious, setIsPrevious] = useState(false);
  const [isForecast, setIsForecast] = useState(false);

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

  const handlePreviousWeather = () => {
    setIsPrevious(true);
    setIsForecast(false);
  };

  const handleForecastWeather = () => {
    setIsForecast(true);
    setIsPrevious(false);
  };

  const fetchJsonFromCloudinary = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
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
    fetchJsonFromCloudinary(url);
  };

  const handleForecastFetch = () => {
    const url =
      "https://res.cloudinary.com/dzmjjm2kn/raw/upload/v1728763418/forecast_daily_ahkerg.json";
    fetchJsonFromCloudinary(url);
  };

  return (
    <div className="flex w-full h-screen bg-[#273D5A] text-white">
      {/* Left Side - Map */}
      <div className="w-1/2 h-full">
        <MapComponent />
      </div>

      {/* Right Side - Options and Dashboard */}
      <div className="w-1/2 h-full flex flex-col">
        {/* Header Section */}
        <div className="bg-[#1E293B] p-5 flex justify-between items-center">
          {/* Search Bar */}
          <input
            type="text"
            className="w-2/3 p-3 rounded-lg text-black"
            placeholder="Search for a location..."
          />

          {/* Option Buttons */}
          <div className="flex space-x-4">
            <button
              className="bg-blue-500 text-black py-2 px-4 rounded-lg hover:bg-blue-600"
              onClick={handlePreviousWeather}
            >
              Previous Weather ⛅
            </button>
            <button
              className="bg-green-500 text-black py-2 px-4 rounded-lg hover:bg-green-600"
              onClick={handleForecastWeather}
            >
              Forecast Weather 🌦️
            </button>
          </div>
        </div>

        {/* Dashboard Section */}
        <div className="flex-1 flex">
          {/* Left Side - Date Selector */}
          <div className="w-1/2 p-5 flex flex-col items-center">
            {isPrevious && (
              <div className="w-full">
                <h2 className="text-3xl mb-4">Previous Weather</h2>
                <input
                  type="date"
                  className="text-black p-2 rounded-lg w-full mb-4"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min="2022-01-01"
                  max="2023-05-31"
                />
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full"
                  onClick={handlePreviousFetch}
                >
                  Fetch Previous Data
                </button>
              </div>
            )}

            {isForecast && (
              <div className="w-full">
                <h2 className="text-3xl mb-4">Forecast Weather</h2>
                <input
                  type="date"
                  className="text-black p-2 rounded-lg w-full mb-4"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min="2023-06-01"
                  max="2023-10-31"
                />
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded-lg w-full"
                  onClick={handleForecastFetch}
                >
                  Fetch Forecast Data
                </button>
              </div>
            )}
          </div>

          {/* Right Side - Weather Card */}
          <div className="w-1/2 p-5">
            <div className="bg-white text-black p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">
                Weather Details for {cityName ? `${cityName}, ${state}` : "N/A"}
              </h3>
              {jsonData ? (
                <div>
                  <p>Date: {jsonData.date}</p>
                  <p>Temperature: {jsonData.temp}°C</p>
                  <p>Condition: {jsonData.condition}</p>
                </div>
              ) : (
                <p>No data available. Select a date to view weather details.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home1;
