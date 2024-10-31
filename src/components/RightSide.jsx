import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChoroplethColorContext } from "./Home/Home";

function RightSide({ dataset }) {
  const { data, pollutant, city, state, isPrevious } = dataset;
  const navigate = useNavigate();
  const [choroplethData, setChoroplethData] = useContext(ChoroplethColorContext);
  const pollutantDivRef = useRef(null);
  const [showAQICard, setShowAQICard] = useState(false);

  const pollutants = {
    "Carbon Monooxide (Parts Per Million)": { label: "CO", unit: "ppm" },
    "Nitrogen Dioxide (Parts Per Million)": { label: "NO₂", unit: "ppm" },
    "Nitric Oxide (Parts Per Million)": { label: "NO", unit: "ppm" },
    "Ozone (Dobson)": { label: "O₃", unit: "ppm" },
    "Sulphur Dioxide (kg/m²)": { label: "SO₂", unit: "ppm" },
    "Particulate Matter 2.5 (Micrograms/Cubic Meter)": { label: "PM 2.5", unit: "µg/m³" },
    "Particulate Matter 10 (Micrograms/Cubic Meter)": { label: "PM 10", unit: "µg/m³" },
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
    
    setChoroplethData(colorMap[level] || "green");
  }, [data, pollutant, setChoroplethData]);

  useEffect(() => {
    const handleMouseEnter = () => setShowAQICard(true);
    const handleMouseLeave = () => setShowAQICard(false);

    const pollutantDiv = pollutantDivRef.current;
    pollutantDiv.addEventListener("mouseenter", handleMouseEnter);
    pollutantDiv.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      pollutantDiv.removeEventListener("mouseenter", handleMouseEnter);
      pollutantDiv.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative w-full max-h-[200px] py-2 pb-5 flex flex-col items-center bg-[#273D5A] text-white">
      <div className="pt-2 flex flex-col">
        {data[pollutant] !== undefined ? (
          <div
            className="h-28 py-4 px-2 bg-[#7099cf] bg-opacity-20 text-center text-white rounded-lg cursor-pointer"
            onClick={() => navigate("/chart", { state: { pollutant, city, state, isPrevious } })}
            ref={pollutantDivRef}
          >
            <div className="flex gap-x-2 text-xl">
              <p>{pollutant}</p>
              <p>{pollutants[pollutant]?.label || ""}</p>
            </div>
            <p className="pt-1 text-lg font-semibold">
              {data[pollutant].toFixed(5)} {pollutants[pollutant]?.unit}
            </p>
          </div>
        ) : (
          <p className="text-lg">Pollutant data not available</p>
        )}

        {showAQICard && (
          <div className="absolute -top-48 left-0 z-20 ml-3 w-48 p-2 bg-white text-black rounded-lg shadow-lg">
            <div className="flex flex-col gap-1">
              {aqiLevels[pollutant]?.map(({ level, range }) => (
                <div key={level} className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${getColorClass(level)}`}></span>
                  <span className="text-sm">
                    {level} - {range[0]} to {range[1]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RightSide;
