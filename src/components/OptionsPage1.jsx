import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BackButtonContext } from "../App";

function OptionsPage1() {
  const [isBackButtonClicked, setIsBackButtonClicked] =
    useContext(BackButtonContext);

  const navigate = useNavigate();
  const location = useLocation();
  const { cityName, state } = location.state || {};

  const [isPrevious, setIsPrevious] = useState(false);
  const [isForecast, setIsForecast] = useState(false);
  const [startDate, setStartDate] = useState("");

  const [jsonData, setJsonData] = useState(null);

  const [isScrollActive, setIsScrollActive] = useState(false);
  const scrollingRef = useRef(null);

  const handleBack = () => {
    setIsBackButtonClicked(true);
    navigate("/");
  };

  const handlePreviousWeather = () => {
    setIsPrevious((prev) => !prev);
    setIsForecast(false);
    setIsScrollActive(true);
  };

  const handleForecastWeather = () => {
    setIsForecast((prev) => !prev);
    setIsPrevious(false);
    setIsScrollActive(true);
  };

  useEffect(() => {
    if (isScrollActive && scrollingRef.current) {
      window.scrollTo({
        top: scrollingRef.current.offsetTop, // Scroll to the position of the component
        behavior: "smooth", // Optional: For smooth scrolling
      });
    }
  }, [isScrollActive]);

  const fetchJsonFromCloudinary = async (url, isPrevious) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json(); // Parse the JSON data
      const requiredData = data.filter((entry) => entry.date === startDate);

      setJsonData(requiredData[0]); // Set the data in state
      console.log(requiredData[0]);
      navigate("/dashboard", {
        state: {
          data: requiredData[0],
          city: cityName,
          state: state,
          isPrevious,
        },
      });
    } catch (error) {
      console.error("Error fetching JSON from Cloudinary:", error);
    }
  };

  const handlePreviousFetch = () => {
    if (cityName) {
      if (cityName === "Lancaster") {
        if (startDate) {
          console.log("in startdate");
          const url =
            "https://res.cloudinary.com/dzmjjm2kn/raw/upload/v1728677086/past_daily_p8vkit.json";
          fetchJsonFromCloudinary(url, true);
        }
      }
    }
  };

  const handleForecastFetch = () => {
    if (cityName) {
      if (cityName === "Lancaster") {
        if (startDate) {
          const url =
            "https://res.cloudinary.com/dzmjjm2kn/raw/upload/v1728763418/forecast_daily_ahkerg.json";
          fetchJsonFromCloudinary(url, false);
        }
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#273D5A] text-white flex flex-col gap-y-5 justify-start items-start">
      {/* Back Button */}
      <p
        className="text-4xl cursor-pointer m-5 px-5 hover:bg-white rounded-xl hover:text-black transition duration-300 ease-in-out"
        onClick={handleBack}
      >
        &lt;
      </p>

      {/* City and State Heading */}
      <div className="w-full flex justify-center items-center">
        <h1 className="text-5xl font-bold shadow-md shadow-zinc-500">
          {cityName}, {state}
        </h1>
      </div>

      {/* Buttons for Previous and Forecast */}
      <div
        ref={scrollingRef}
        className="w-full pt-10 flex justify-center gap-x-10"
      >
        {/* Previous Weather Button */}
        <div
          className="w-1/3 py-5 px-5 bg-gradient-to-r from-blue-300 to-blue-500 rounded-2xl shadow-md shadow-zinc-500 hover:scale-105 transition-all duration-300 transform hover:bg-opacity-90
          flex justify-center items-center cursor-pointer animate__animated animate__bounceInLeft"
          onClick={handlePreviousWeather}
        >
          <button className="text-3xl text-center font-semibold">
            Previous Weather/Pollutant Levels <span>⛅</span>
          </button>
        </div>

        {/* Forecast Weather Button */}
        <div
          className="w-1/3 py-5 px-5 bg-gradient-to-r from-green-300 to-green-400 rounded-2xl shadow-md shadow-zinc-500 hover:scale-105 transition-all duration-300 transform hover:bg-opacity-90
          flex justify-center items-center cursor-pointer animate__animated animate__bounceInRight"
          onClick={handleForecastWeather}
        >
          <button className="text-3xl text-center font-semibold">
            Forecast Weather/Pollutant Levels <span>🌦️</span>
          </button>
        </div>
      </div>

      {/* Back to Map Button */}
      <div className="w-full pt-10 flex justify-center gap-x-10">
        <div
          className="w-1/4 py-5 px-5 bg-gradient-to-r from-orange-300 to-orange-500 rounded-2xl shadow-md shadow-zinc-500 hover:scale-105 transition-all duration-300 transform hover:bg-opacity-90
          flex justify-center items-center cursor-pointer animate__animated animate__bounceInUp animate__delay-1s"
          onClick={handleBack}
        >
          <button className="text-3xl text-center font-semibold">
            Back to Map <span>🗺️</span>
          </button>
        </div>
      </div>

      {/* Previous Weather Date Picker */}
      {isPrevious && (
        <div className="w-full bg-[#273D5A] flex flex-col gap-y-5 items-center justify-center py-10">
          <h2 className="text-3xl font-semibold">Past Weather Date Range</h2>
          <div className="w-1/3 flex flex-col gap-y-10 items-center">
            <div className="w-full flex justify-center items-center gap-x-10">
              <h3 className="text-xl font-medium">Select Date:</h3>
              <input
                type="date"
                className="rounded-lg min-w-56 text-black px-2 py-1 text-lg text-center shadow-md shadow-zinc-500 focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300"
                min="2022-01-01"
                max="2023-05-31"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
                required
              />
            </div>
            <button
              className="px-5 py-2 bg-white rounded-xl text-blue-700 font-medium"
              onClick={handlePreviousFetch}
            >
              Fetch
            </button>
          </div>
        </div>
      )}

      {/* Forecast Weather Date Picker */}
      {isForecast && (
        <div className="w-full bg-[#273D5A] flex flex-col gap-y-5 items-center justify-center py-10">
          <h2 className="text-3xl font-semibold">
            Forecast Weather Date Range
          </h2>
          {/* <div className="flex gap-x-5">
            <button
              className="focus:outline-none focus:ring-4 focus:ring-green-500 transition duration-300
            px-5 py-2 rounded-full text-lg bg-white text-green-600 font-medium"
            >
              Daily
            </button>
            <button
              className="focus:outline-none focus:ring-4 focus:ring-green-500 transition duration-300
            px-5 py-2 rounded-full text-lg bg-white text-green-600 font-medium"
            >
              Hourly
            </button>
          </div> */}
          <div className="w-1/3 flex flex-col gap-y-10 items-center">
            <div className="w-full flex justify-center items-center gap-x-10">
              <h3 className="text-xl font-medium">Select Date:</h3>
              <input
                type="date"
                className="rounded-lg min-w-56 text-black px-2 py-1 text-lg text-center shadow-md shadow-zinc-500 focus:outline-none focus:ring-4 focus:ring-green-500 transition duration-300"
                min="2023-06-01"
                max="2023-10-31"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
                required
              />
            </div>
            <button
              className="px-5 py-2 bg-white rounded-xl text-green-700 font-medium"
              onClick={handleForecastFetch}
            >
              Fetch
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OptionsPage1;
