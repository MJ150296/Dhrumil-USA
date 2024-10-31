import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function LeftSide({ dataset }) {
  const [uvStatus, setUvStatus] = useState("");
  const [humidityStatus, setHumidityStatus] = useState("");
  const needleRef = useRef(null);

  const { data, city, state, isPrevious, pollutant } = dataset;

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      const needle = needleRef.current;
      needle.style.transform = `rotate(${data.wind_direction}deg)`;
    }
  }, [data]);

  const showDailyChart = (pollutantName) => {
    navigate("/chart", {
      state: {
        pollutant: pollutantName,
        date: data.date,
        city,
        state,
        isPrevious,
      },
    });
  };

  return (
    <div className="max-w-full max-h-[450px] overflow-hidden bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
      {/* <div className="w-full flex justify-between">
        <p className="text-lg font-medium text-[#273D5A]">{data.date}</p>
      </div> */}
      <div className="pt-3">
        {/* <p className="font-semibold text-lg text-center mb-2">Today Overview</p> */}
        <div className="gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-3">
          {[
            { label: "Wind Speed", value: `${data.wind_speed.toFixed(2)} kmph`, icon: "icons/windy.png", chart: "wind_speed" },
            { label: "Precipitation", value: data.precip, icon: "icons/rain.png", chart: "precip" },
            { label: "Pressure (sea level)", value: data.sea_level_pressure.toFixed(2), icon: "icons/pressure.png", chart: "sea_level_pressure" },
            { label: "UV Index", value: `${data.uv_index.toFixed(2)} mJ/cm²`, icon: "icons/sunrise.png", chart: "uv_index" },
            { label: "Gust", value: `${data.wind_gust.toFixed(2)} kmph`, icon: "icons/windy.png", chart: "wind_gust" },
            { label: "Humidity", value: `${data.humidity.toFixed(2)}%`, icon: "icons/humidity.png", chart: "humidity" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="cursor-pointer p-2 flex flex-col items-center text-[#273D5A] bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
              onClick={() => showDailyChart(item.chart)}
            >
              <img src={item.icon} alt={item.label} width={40} className="mb-1" />
              <p className="text-center text-sm font-medium">{item.label}</p>
              <p className="text-lg font-semibold">{item.value}</p>
            </div>
          ))}
          <div className="flex flex-col items-center text-[#273D5A] bg-slate-100 rounded-lg p-2">
            <div className="w-[80px] h-[80px] relative flex justify-center items-center">
              <img src="compass/compass.png" alt="Compass" className="w-full h-full" />
              <div className="absolute inset-0 flex justify-center items-center">
                <img
                  ref={needleRef}
                  src="compass/needle2.png"
                  alt="Compass needle"
                  width={30}
                  className="transition-transform duration-1000"
                />
              </div>
            </div>
            <p className="text-center text-sm font-medium mt-2">Wind Direction</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSide;
