import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

let pollutantData = [];

const EnvironmentalChart = () => {
  const [isChartDataLoaded, setIsChartDataLoaded] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { pollutant, data, city, state, isPrevious } = location.state || {};
  console.log(pollutant, data, city, state, isPrevious);

  const { date } = data;

  console.log("DATE", date);

  const fetchHourlyFromCloudinary = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP Error Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("data", data);
      setIsChartDataLoaded(true);

      if (data) {
        const reqData = data.filter((entry) => {
          const onlyDate = entry.combined_datetime.split(" ")[0];
          return onlyDate === date;
        });

        console.log("reqData", reqData);

        reqData.map((data) => {
          const time = data.combined_datetime.split(" ")[1];
          console.log(data.combined_datetime.split(" ")[1]);
          console.log(data[pollutant]);

          let standardUnit = "";
          if (pollutant === "wind_speed" || "wind_gust") {
            standardUnit = "kmph";
          }
          standardUnit = "ppm";

          pollutantData.push({
            name: time,
            value: data[pollutant],
            unit: standardUnit,
          });
        });
      } else {
        const reqData = data.filter((entry) => {
          const onlyDate = entry.combined_datetime.split(" ")[0];
          return onlyDate === date;
        });

        reqData.map((data) => {
          const time = data.combined_datetime.split(" ")[1];
          // console.log(data.combined_datetime.split(" ")[1]);
          // console.log(data[pollutant]);

          let standardUnit = "";
          if (pollutant === "wind_speed" || "wind_gust") {
            standardUnit = "kmph";
          }
          standardUnit = "ppm";

          pollutantData.push({
            name: time,
            value: data[pollutant],
            unit: standardUnit,
          });
        });
      }
    } catch (error) {
      console.error("Error fetching JSON from cloudinary", error);
    }
  };

  useEffect(() => {
    pollutantData = [];
    if (pollutant && date && city && state) {
      const checkDate = new Date(date);
      if (isPrevious && city === "Riverside") {
        const startDate = new Date("2022-01-01");
        const endDate = new Date("2023-05-31");

        if (checkDate >= startDate && checkDate <= endDate) {
          const url =
            "https://res.cloudinary.com/data298b/raw/upload/v1729987106/Past_hourly_i63kzp.json";
          fetchHourlyFromCloudinary(url);
        }
      } else if (!isPrevious && city === "Riverside") {
        const url =
          "https://res.cloudinary.com/data298b/raw/upload/v1729987102/Forecast_hourly_reh7a3.json";
        fetchHourlyFromCloudinary(url);
      } else if (isPrevious && city === "Santa Clarita") {
        const startDate = new Date("2022-01-01");
        const endDate = new Date("2022-12-31");

        if (checkDate >= startDate && checkDate <= endDate) {
          const url =
            "https://res.cloudinary.com/data298b/raw/upload/v1731474548/csvjson_ewo9ft.json";
          fetchHourlyFromCloudinary(url);
        } else {
          const url =
            "https://res.cloudinary.com/data298b/raw/upload/v1731474548/csvjson_ewo9ft.json";
          fetchHourlyFromCloudinary(url);
        }
      } else if (!isPrevious && city === "Santa Clarita") {
        const url =
          "https://res.cloudinary.com/data298b/raw/upload/v1729987278/Forecast_hourly_zoxbza.json";
        fetchHourlyFromCloudinary(url);
      } else if (isPrevious && city === "San Bernardino") {
        const startDate = new Date("2022-01-01");
        const endDate = new Date("2023-05-31");

        if (checkDate >= startDate && checkDate <= endDate) {
          const url =
            "https://res.cloudinary.com/data298b/raw/upload/v1729987249/Past_hourly_o22q6c.json";
          fetchHourlyFromCloudinary(url);
        }
      } else if (!isPrevious && city === "San Bernardino") {
        const url =
          "https://res.cloudinary.com/data298b/raw/upload/v1729987239/Forecast_hourly_pirv5q.json";
        fetchHourlyFromCloudinary(url);
      }
    }
  }, [pollutantData, pollutant]);

  const handleBackButton = () => {
    navigate("/");
  };

  const aqiLevels = {
    "Nitrogen Dioxide (Parts Per Million)": [
      { level: "GOOD", range: [0.0, 0.053] },
      { level: "MODERATE", range: [0.054, 0.1] },
      { level: "UNHEALTHY for Sensitive Groups", range: [0.101, 0.36] },
      { level: "UNHEALTHY", range: [0.361, 0.649] },
      { level: "HAZARDOUS", range: [0.65, 2.049] },
    ],
    "Nitric Oxide (Parts Per Million)": [
      { level: "GOOD", range: [0.0, 0.053] },
      { level: "MODERATE", range: [0.054, 0.1] },
      { level: "UNHEALTHY for Sensitive Groups", range: [0.101, 0.36] },
      { level: "UNHEALTHY", range: [0.361, 0.649] },
      { level: "HAZARDOUS", range: [0.65, 2.049] },
    ],
    "Particulate Matter 2.5 (Micrograms/Cubic Meter)": [
      { level: "GOOD", range: [0.0, 12.0] },
      { level: "MODERATE", range: [12.1, 35.4] },
      { level: "UNHEALTHY for Sensitive Groups", range: [35.5, 55.4] },
      { level: "UNHEALTHY", range: [55.5, 150.4] },
      { level: "HAZARDOUS", range: [150.5, 500.4] },
    ],
    "Particulate Matter 10 (Micrograms/Cubic Meter)": [
      { level: "GOOD", range: [0, 54] },
      { level: "MODERATE", range: [55, 154] },
      { level: "UNHEALTHY for Sensitive Groups", range: [155, 254] },
      { level: "UNHEALTHY", range: [255, 354] },
      { level: "HAZARDOUS", range: [355, 604] },
    ],
    "Carbon Monooxide (Parts Per Million)": [
      { level: "GOOD", range: [0.0, 4.4] },
      { level: "MODERATE", range: [4.5, 9.4] },
      { level: "UNHEALTHY for Sensitive Groups", range: [9.5, 12.4] },
      { level: "UNHEALTHY", range: [12.5, 15.4] },
      { level: "HAZARDOUS", range: [15.5, 50.4] },
    ],
    "Ozone (Dobson)": [
      { level: "GOOD", range: [0, 140] },
      { level: "MODERATE", range: [141, 280] },
      { level: "UNHEALTHY for Sensitive Groups", range: [281, 420] },
      { level: "UNHEALTHY", range: [421, 560] },
      { level: "HAZARDOUS", range: [561, 700] },
    ],
    "Sulphur Dioxide (kg/m²)": [
      { level: "GOOD", range: [0.0, 0.00003] },
      { level: "MODERATE", range: [0.00003, 0.00006] },
      { level: "UNHEALTHY for Sensitive Groups", range: [0.00006, 0.00009] },
      { level: "UNHEALTHY", range: [0.00009, 0.00011] },
      { level: "HAZARDOUS", range: [0.00011, 0.00014] },
    ],
  };

  const determineAQILevel = (value) => {
    const pollutantLevels = aqiLevels[pollutant];
    if (!pollutantLevels) return null;

    for (let { level, range } of pollutantLevels) {
      const [min, max] = range;
      if (value >= min && value <= max) {
        return level;
      }
    }
    return null;
  };

  const getColorClass = (level) => {
    switch (level) {
      case "GOOD":
        return "bg-green-500";
      case "MODERATE":
        return "bg-yellow-400";
      case "UNHEALTHY for Sensitive Groups":
        return "bg-orange-400";
      case "UNHEALTHY":
        return "bg-red-500";
      case "HAZARDOUS":
        return "bg-purple-700";
      default:
        return "bg-gray-300";
    }
  };

  useEffect(() => {
    const level = determineAQILevel(data[pollutant]);
    const colorMap = {
      GOOD: "green",
      MODERATE: "yellow",
      "UNHEALTHY for Sensitive Groups": "orange",
      UNHEALTHY: "red",
      HAZARDOUS: "purple",
    };
    console.log("colorMap[level]", colorMap[level]);
  }, [data, pollutant]);

  return (
    <div className="w-full flex flex-col gap-y-2">
      <div className="p-5 w-full flex justify-between items-center">
        <button
          onClick={handleBackButton}
          className="text-black text-2xl font-semibold"
        >
          &lt; <span className="font-normal text-base">back</span>
        </button>
        <div className="flex gap-3">
          {aqiLevels[pollutant]?.map(({ level, range }) => (
            <div key={level} className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full ${getColorClass(level)}`}
              ></span>
              <span className="text-sm">
                {level} - {range[0]} to {range[1]}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div
        className="flex px-10 justify-between items-start
       py-5"
      >
        <p className="text-[#8884D8] text-xl font-medium">
          {city}, {state}
        </p>
        <div className="flex flex-col items-center gap-y-5 justify-center">
          <p className="text-[#8884D8] text-xl font-medium">
            Air Quality analysis and prediction
          </p>
          <p className="text-2xl">{pollutant}</p>
        </div>
        <p className="text-xl text-[#8884D8] font-medium">{date}</p>
      </div>
      {isChartDataLoaded ? (
        <div>
          <ResponsiveContainer width="100%" height={450}>
            <BarChart
              data={pollutantData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex h-96 items-center justify-center space-x-2">
          <div className="w-8 h-8 bg-violet-600 rounded-full animate__animated animate__bounce"></div>
          <div className="w-8 h-8 bg-violet-400 rounded-full animate__animated animate__bounce animate__fast"></div>
          <div className="w-8 h-8 bg-violet-200 rounded-full animate__animated animate__bounce animate__faster"></div>
        </div>
      )}
    </div>
  );
};

export default EnvironmentalChart;
