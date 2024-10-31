import React, { useContext, useEffect, useRef, useState } from "react";
import { json, useLocation, useNavigate } from "react-router-dom";
import { BackButtonContext } from "../App";
import { AddressContext } from "./Home/Home";
import Dashboard from "./Dashboard";

function OptionsPage1() {
  const [isBackButtonClicked, setIsBackButtonClicked] =
    useContext(BackButtonContext);

  const navigate = useNavigate();
  const location = useLocation();
  // const { cityName, state } = location.state || {};
  const [address, setAddress] = useContext(AddressContext);
  const [cityName, setCityName] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {
    if (address) {
      const { cityName, state } = address;
      setCityName(cityName);
      setState(state);
    }
  }, [address]);

  const [isPrevious, setIsPrevious] = useState(false);
  const [isForecast, setIsForecast] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [isDateFound, setIsDateFound] = useState(false);

  const [jsonData, setJsonData] = useState(null);
  const [isDataofCityNotFound, setIsDataofCityNotFound] = useState(false);

  const [isScrollActive, setIsScrollActive] = useState(false);
  const scrollingRef = useRef(null);

  const [pollutant, setPollutant] = useState("");

  const dateInputRef = useRef(null);

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

  // useEffect(() => {
  //   if (isScrollActive && scrollingRef.current) {
  //     window.scrollTo({
  //       top: scrollingRef.current.offsetTop, // Scroll to the position of the component
  //       behavior: "smooth", // Optional: For smooth scrolling
  //     });
  //   }
  // }, [isScrollActive]);

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
      // navigate("/dashboard", {
      //   state: {
      //     data: requiredData[0],
      //     city: cityName,
      //     state: state,
      //     isPrevious,
      //   },
      // });
    } catch (error) {
      console.error("Error fetching JSON from Cloudinary:", error);
    }
  };

  const handlePreviousFetch = () => {
    setIsDateFound(false);
    let intervalId;
    if (cityName) {
      if (cityName === "Riverside") {
        if (startDate) {
          console.log("in startdate");
          const url =
            "https://res.cloudinary.com/data298b/raw/upload/v1729987102/Past_daily_sugsvo.json";
          fetchJsonFromCloudinary(url, true);
        } else {
          setIsDateFound(true);
        }
      } else if (cityName === "San Bernardino") {
        if (startDate) {
          console.log("in startdate");
          const url =
            "https://res.cloudinary.com/data298b/raw/upload/v1729987240/Past_daily_hfa00f.json";
          fetchJsonFromCloudinary(url, true);
        } else {
          setIsDateFound(true);
        }
      } else if (cityName === "Santa Clarita") {
        if (startDate) {
          console.log("in startdate");
          const url =
            "https://res.cloudinary.com/data298b/raw/upload/v1729987281/Past_daily_vm7zfc.json";
          fetchJsonFromCloudinary(url, true);
        } else {
          setIsDateFound(true);
        }
      } else {
        setIsDataofCityNotFound(true);
        intervalId = setTimeout(() => {
          setIsDataofCityNotFound(false);
        }, 2000);
      }
    }

    return clearTimeout(intervalId);
  };

  const handleForecastFetch = () => {
    setIsDateFound(false);
    let intervalId;

    if (cityName) {
      if (cityName === "Riverside") {
        console.log(cityName);

        if (startDate) {
          console.log(startDate);

          const url =
            "https://res.cloudinary.com/data298b/raw/upload/v1729987099/Forecast_daily_hrhuae.json";
          fetchJsonFromCloudinary(url, true);
        } else {
          setIsDateFound(true);
        }
      } else if (cityName === "San Bernardino") {
        if (startDate) {
          console.log("in startdate");
          const url =
            "https://res.cloudinary.com/data298b/raw/upload/v1729987236/Forecast_daily_yvghuf.json";
          fetchJsonFromCloudinary(url, true);
        } else {
          setIsDateFound(true);
        }
      } else if (cityName === "Santa Clarita") {
        if (startDate) {
          console.log("in startdate");
          const url =
            "https://res.cloudinary.com/data298b/raw/upload/v1729987275/Forecast_daily_ad7j8i.json";
          fetchJsonFromCloudinary(url, true);
        } else {
          setIsDateFound(true);
        }
      } else {
        setIsDataofCityNotFound(true);
        intervalId = setTimeout(() => {
          setIsDataofCityNotFound(false);
        }, 2000);
      }
    }
    return clearTimeout(intervalId);
  };

  const focusDateInputField = () => {
    dateInputRef.current.focus();
    setIsDateFound(false);
  };

  return (
    <div className="flex flex-col">
      {isDataofCityNotFound && (
        <div className="absolute right-0 bottom-0">
          <div className="w-[500px] bg-yellow-100 border border-yellow-300 text-yellow-700 rounded-lg p-4 text-center">
            <p className="text-base font-semibold">
              ⚠️ Data will be added soon. Stay tuned!
            </p>
          </div>
        </div>
      )}
      {isDateFound && (
        <div className="absolute right-0 bottom-0">
          <div className="flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md text-center border border-blue-200">
              <h2 className="text-xl font-semibold text-gray-800">
                📅 Please input the date
              </h2>
              <p className="mt-2 text-gray-600">
                Selecting a date will help us provide the correct information!
              </p>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={focusDateInputField}
              >
                Select Date
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full bg-[#273D5A] text-white flex flex-col gap-y-2 justify-start items-start">
        {/* Back Button */}
        {/* <p
        className="text-4xl cursor-pointer m-5 px-5 hover:bg-white rounded-xl hover:text-black transition duration-300 ease-in-out"
        onClick={handleBack}
      >
        &lt;
      </p> */}

        {/* City and State Heading */}
        <div className="w-full flex justify-center items-center">
          <div className="text-2xl font-semibold mt-2">
            {cityName && (
              <p>
                {cityName}, {state}
              </p>
            )}
          </div>
        </div>

        {/* Buttons for Previous and Forecast */}
        <div
          ref={scrollingRef}
          className="w-full pt-5 flex justify-center gap-x-5 px-5"
        >
          {/* Previous Weather Button */}
          <div
            className="w-1/2 py-2 px-2 bg-gradient-to-r from-blue-300 to-blue-500 rounded-2xl shadow-md shadow-zinc-500 hover:scale-105 transition-all duration-300 transform hover:bg-opacity-90
          flex justify-center items-center cursor-pointer animate__animated animate__bounceInLeft"
            onClick={handlePreviousWeather}
          >
            <button className="text-xl text-center font-semibold">
              Previous Weather/Pollutant Levels <span>⛅</span>
            </button>
          </div>

          {/* Forecast Weather Button */}
          <div
            className="w-1/2 py-2 px-2 bg-gradient-to-r from-green-300 to-green-400 rounded-2xl shadow-md shadow-zinc-500 hover:scale-105 transition-all duration-300 transform hover:bg-opacity-90
          flex justify-center items-center cursor-pointer animate__animated animate__bounceInRight"
            onClick={handleForecastWeather}
          >
            <button className="text-xl text-center font-semibold">
              Forecast Weather/Pollutant Levels <span>🌦️</span>
            </button>
          </div>
        </div>

        {/* Back to Map Button */}
        {/* <div className="w-full pt-10 flex justify-center gap-x-10">
        <div
          className="w-1/4 py-5 px-5 bg-gradient-to-r from-orange-300 to-orange-500 rounded-2xl shadow-md shadow-zinc-500 hover:scale-105 transition-all duration-300 transform hover:bg-opacity-90
          flex justify-center items-center cursor-pointer animate__animated animate__bounceInUp animate__delay-1s"
          onClick={handleBack}
        >
          <button className="text-3xl text-center font-semibold">
            Back to Map <span>🗺️</span>
          </button>
        </div>
      </div> */}

        {/* Previous Weather Date Picker */}
        {isPrevious && (
          <div className="w-full bg-[#273D5A] flex gap-x-5 items-center justify-start py-5 px-10">
            {/* <h2 className="text-lg font-semibold">Past Date Range</h2> */}
            <div className="w-full flex gap-x-5 items-start justify-start">
              <div className="w-full flex justify-start items-center gap-x-2">
                <h3 className="text-lg font-medium">Date:</h3>
                <input
                  ref={dateInputRef}
                  type="date"
                  className="rounded-lg min-w-40 text-black px-2 py-1 text-base text-center shadow-md shadow-zinc-500 focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300"
                  min="2022-01-01"
                  max="2023-05-31"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                  required
                />
                <div className="">
                  {/* <input
                  type="text"
                  className="rounded-lg text-black px-2 py-1 text-base text-center shadow-md shadow-zinc-500 focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300"
                  placeholder="Select Pollutant"
                /> */}
                  <select
                    className="rounded-lg w-72 text-black px-2 py-1 text-base text-center shadow-md shadow-zinc-500 focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300"
                    value={pollutant}
                    onChange={(e) => setPollutant(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Pollutant
                    </option>
                    <option value="solar_radiation">Solar Radiation</option>
                    <option value="uv_index">UV Index</option>
                    <option value="Nitrogen Dioxide (Parts Per Million)">
                      Nitrogen Dioxide (Parts Per Million)
                    </option>
                    <option value="Nitric Oxide (Parts Per Million)">
                      Nitric Oxide (Parts Per Million)
                    </option>
                    <option value="Particulate Matter 10 (Micrograms/Cubic Meter)">
                      Particulate Matter 10 (Micrograms/Cubic Meter)
                    </option>
                    <option value="Particulate Matter 2.5 (Micrograms/Cubic Meter)">
                      Particulate Matter 2.5 (Micrograms/Cubic Meter)
                    </option>
                    <option value="Carbon Monooxide (Parts Per Million)">
                      Carbon Monooxide (Parts Per Million)
                    </option>
                    <option value="Ozone (Dobson)">
                      Ozone (Parts Per Million)
                    </option>
                    <option value="Sulphur Dioxide (kg/m²)">
                      Sulphur Dioxide (Parts Per Million)
                    </option>
                  </select>
                </div>
              </div>

              <button
                className="px-5 py-2 bg-white rounded-xl text-blue-700 font-medium"
                onClick={handlePreviousFetch}
              >
                Go
              </button>
            </div>
          </div>
        )}

        {/* Forecast Weather Date Picker */}
        {isForecast && (
          <div className="w-full bg-[#273D5A] flex gap-x-5 items-center justify-start p-5">
            {/* <h2 className="text-3xl font-semibold">
            Forecast Weather Date Range
          </h2> */}
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
            <div className="w-1/2 flex gap-y-5 items-center gap-x-5">
              <div className="w-full flex justify-center items-center gap-x-2">
                <h3 className="text-xl font-medium">Date:</h3>
                <input
                  type="date"
                  className="rounded-lg min-w-40 text-black px-2 py-1 text-lg text-center shadow-md shadow-zinc-500 focus:outline-none focus:ring-4 focus:ring-green-500 transition duration-300"
                  min="2023-06-01"
                  max="2023-10-31"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="">
                {/* <input
                  type="text"
                  className="rounded-lg text-black px-2 py-1 text-base text-center shadow-md shadow-zinc-500 focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300"
                  placeholder="Select Pollutant"
                /> */}
                <select
                  className="rounded-lg w-72 text-black px-2 py-1 text-base text-center shadow-md shadow-zinc-500 focus:outline-none focus:ring-4 focus:ring-green-500 transition duration-300"
                  value={pollutant}
                  onChange={(e) => setPollutant(e.target.value)}
                >
                  <option value="" disabled>
                    Select Pollutant
                  </option>
                  <option value="solar_radiation">Solar Radiation</option>
                  <option value="uv_index">UV Index</option>
                  <option value="Nitrogen Dioxide (Parts Per Million)">
                    Nitrogen Dioxide (Parts Per Million)
                  </option>
                  <option value="Nitric Oxide (Parts Per Million)">
                    Nitric Oxide (Parts Per Million)
                  </option>
                  <option value="Particulate Matter 10 (Micrograms/Cubic Meter)">
                    Particulate Matter 10 (Micrograms/Cubic Meter)
                  </option>
                  <option value="Particulate Matter 2.5 (Micrograms/Cubic Meter)">
                    Particulate Matter 2.5 (Micrograms/Cubic Meter)
                  </option>
                  <option value="Carbon Monooxide (Parts Per Million)">
                    Carbon Monooxide (Parts Per Million)
                  </option>
                  <option value="Ozone (Dobson)">Ozone (Dobson)</option>
                  <option value="Sulphur Dioxide (kg/m²)">
                    Sulphur Dioxide (kg/m²)
                  </option>
                </select>
              </div>
              <button
                className="px-5 py-2 bg-white rounded-xl text-green-700 font-medium"
                onClick={handleForecastFetch}
              >
                Go
              </button>
            </div>
          </div>
        )}
      </div>
      {jsonData && (
        <Dashboard
          data={jsonData}
          city={cityName}
          state={state}
          isPrevious={isPrevious}
          pollutant={pollutant}
        />
      )}
    </div>
  );
}

export default OptionsPage1;
