import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BackButtonContext } from "../App";

function OptionsPage() {
  const [LancasterPastDailyFileData, setLancasterPastDailyFileData] =
    useState();
  const [LancasterPastHourlyFileData, setLancasterPastHourlyFileData] =
    useState();

  const [isBackButtonClicked, setIsBackButtonClicked] =
    useContext(BackButtonContext);

  const navigate = useNavigate();
  const location = useLocation();
  const { cityName, state } = location.state || {};

  const [isPrevious, setIsPrevious] = useState(false);
  const [isForecast, setIsForecast] = useState(false);
  const [startDate, setStartDate] = useState("");

  const promptUserForFileUpload = async (event, fileName) => {
    // Create an input element to accept file uploads

    const file = event?.target.files[0];
    if (file) {
      const fileContent = await readFileContent(file);
      // Store the file content in localStorage
      if (fileName === "LancasterPastDaily") {
        localStorage.setItem(
          "LancasterPastDailyJSONFile",
          JSON.stringify(fileContent)
        );
        setLancasterPastDailyFileData(fileContent);
      }
      if (fileName === "LancasterPastHourly") {
        localStorage.setItem(
          "LancasterPastHourlyJSONFile",
          JSON.stringify(fileContent)
        );
        setLancasterPastHourlyFileData(fileContent);
      }
    }
  };

  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const fileContent = JSON.parse(e?.target.result); // Parse the JSON content
          resolve(fileContent);
        } catch (error) {
          reject("Error parsing JSON file");
        }
      };
      reader.onerror = () => reject("Error reading file");
      reader.readAsText(file); // Read the file as text
    });
  };

  useEffect(() => {
    if (cityName) {
      console.log(cityName);
      if (cityName === "Lancaster") {
        const LancasterPastDailyJSONFile = localStorage.getItem(
          "LancasterPastDailyJSONFile"
        );
        const LancasterPastHourlyJSONFile = localStorage.getItem(
          "LancasterPastHourlyJSONFile"
        );

        if (LancasterPastDailyJSONFile) {
          console.log("LancasterPastDailyJSONFile File found in localStorage!");
          setLancasterPastDailyFileData(JSON.parse(LancasterPastDailyJSONFile));
        } else {
          // If the file is not present, prompt user to upload it
          console.log("LancasterPastDailyJSONFile File found NOT FOUND");
        }
        if (LancasterPastHourlyJSONFile) {
          console.log(
            "LancasterPastHourlyJSONFile File found in localStorage!"
          );
          setLancasterPastHourlyFileData(
            JSON.parse(LancasterPastHourlyJSONFile)
          );
        } else {
          // If the file is not present, prompt user to upload it
          console.log("LancasterPastHourlyJSONFile File found NOT FOUND");
        }
      }
    }
  }, []);

  const handleBack = () => {
    setIsBackButtonClicked(true);
    navigate("/");
  };

  const handlePreviousWeather = () => {
    setIsPrevious((prev) => !prev);
    setIsForecast(false);
  };

  const handleForecastWeather = () => {
    setIsForecast((prev) => !prev);
    setIsPrevious(false);
  };

  return (
    <div className="w-full h-full bg-[#273D5A] text-white flex flex-col gap-y-5 justify-start items-start">
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
      <div className="w-full pt-10 flex justify-center gap-x-10">
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
        <div className="w-full flex flex-col gap-y-5 items-center justify-center py-10">
          <h2 className="text-3xl font-semibold">Past Weather Date Range</h2>
          <div className="w-1/3 flex flex-col gap-y-10 items-center">
            <div className="w-full flex justify-center items-center gap-x-10">
              <h3 className="text-xl font-medium">From:</h3>
              <input
                type="date"
                className="rounded-lg w-1/3 text-black px-2 py-1 text-lg text-center shadow-md shadow-zinc-500 focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300"
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
              onClick={() => {
                console.log(startDate);

                if (!startDate) {
                  console.log("No date found");
                  return false;
                }
                if (!LancasterPastDailyFileData) {
                  console.log("No file data while clicking fetch button");
                  return false;
                }
                const requiredData = LancasterPastDailyFileData.filter(
                  (data) => startDate === data.combined_datetime
                );
                console.log(requiredData);
              }}
            >
              Fetch
            </button>
          </div>
        </div>
      )}

      {/* Forecast Weather Date Picker */}
      {isForecast && (
        <div className="w-full flex flex-col gap-y-5 items-center justify-center py-10">
          <h2 className="text-3xl font-semibold">
            Forecast Weather Date Range
          </h2>
          <div className="w-1/3 flex flex-col gap-y-10 items-center">
            <div className="w-full flex justify-center items-center gap-x-10">
              <h3 className="text-xl font-medium">From:</h3>
              <input
                type="date"
                className="rounded-lg w-1/3 text-black px-2 py-1 text-lg text-center shadow-md shadow-zinc-500 focus:outline-none focus:ring-4 focus:ring-green-500 transition duration-300"
                min="2023-06-01"
                max="2023-10-31"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
                required
              />
            </div>
            <button className="px-5 py-2 bg-white rounded-xl text-green-700 font-medium">
              Fetch
            </button>
          </div>
        </div>
      )}
      <div>
        {LancasterPastDailyFileData ? (
          <div>
            <h3>Lancaster Past Daily File Data:</h3>
            {/* <pre>
              {JSON.stringify(LancasterPastDailyFileData, null, 2)}
            </pre>{" "} */}
            {/* Display formatted JSON */}
          </div>
        ) : (
          <div className="flex gap-x-10">
            <p className="text-xl">Lancaster Past Daily File:</p>
            <input
              type="file"
              accept=".json"
              onChange={(e) => {
                promptUserForFileUpload(e, "LancasterPastDaily");
              }}
            />
          </div>
        )}
      </div>
      <div>
        {LancasterPastHourlyFileData ? (
          <div>
            <h3>Lancaster Past Hourly File Data:</h3>
            <pre>
              {JSON.stringify(LancasterPastHourlyFileData, null, 2)}
            </pre>{" "}
            {/* Display formatted JSON */}
          </div>
        ) : (
          <div className="flex gap-x-10">
            <p className="text-xl">Lancaster Past Hourly File:</p>
            <input
              type="file"
              accept=".json"
              onChange={(e) => {
                promptUserForFileUpload(e, "LancasterPastHourly");
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default OptionsPage;
