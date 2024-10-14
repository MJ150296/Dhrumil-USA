import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function LeftSide({ dataset }) {
  const [uvStatus, setUvStatus] = useState("");
  const [humidityStatus, setHumidityStatus] = useState("");
  const needleRef = useRef(null);

  const { data, city, state, isPrevious } = dataset;

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
    <div className="w-3/5 flex flex-col items-center">
      <div className="w-full pl-5 pt-5 flex justify-between">
        <p className="text-2xl font-medium text-[#273D5A]">{data.date}</p>
      </div>
      <div className="pt-5">
        <div className="px-10 font-semibold text-2xl flex justify-between">
          <p>Today Overview</p>
        </div>

        <div className="gap-10 py-5 flex flex-wrap justify-center items-center">
          <div
            className="cursor-pointer w-2/5 p-3 flex justify-evenly items-center text-[#273D5A] bg-slate-100 rounded-lg"
            onClick={() => {
              showDailyChart("wind_speed");
            }}
          >
            <img src="icons/windy.png" alt="sunrise" width={50} />
            <div className="flex flex-col gap-y-1 text-center">
              <p className="">Wind Speed</p>
              <p className="text-2xl font-semibold">{data.wind_speed.toFixed(2)} kmph</p>
            </div>
          </div>
          <div
            className="cursor-pointer w-2/5 p-3 flex justify-evenly items-center text-[#273D5A] bg-slate-100 rounded-lg"
            onClick={() => {
              showDailyChart("precip");
            }}
          >
            <img src="icons/rain.png" alt="sunrise" width={50} />
            <div className="flex flex-col gap-y-1 text-center">
              <p className="">Precipitation</p>
              <p className="text-2xl font-semibold">{data.precip}</p>
            </div>
          </div>
          <div
            className="cursor-pointer w-2/5 p-3 flex justify-evenly items-center text-[#273D5A] bg-slate-100 rounded-lg"
            onClick={() => {
              showDailyChart("sea_level_pressure");
            }}
          >
            <img src="icons/pressure.png" alt="sunrise" width={50} />
            <div className="flex flex-col gap-y-1 text-center">
              <p className="">Pressure (sea level)</p>
              <p className="text-2xl font-semibold">
                {data.sea_level_pressure.toFixed(2)}
              </p>
            </div>
          </div>
          <div
            className="cursor-pointer w-2/5 p-3 flex justify-evenly items-center text-[#273D5A] bg-slate-100 rounded-lg"
            onClick={() => {
              showDailyChart("uv_index");
            }}
          >
            <img src="icons/sunrise.png" alt="sunrise" width={50} />
            <div className="flex flex-col gap-y-1 text-center">
              <p className="">Uv Index</p>
              <p className="text-2xl font-semibold">
                {data.uv_index.toFixed(2)}
                <span className="text-lg">
                  mJ/cm<span className="text-sm align-top">2</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full pl-20 gap-x-5 flex justify-start">
        <>
          <div className="w-2/5">
            <div className="w-[200px] h-[190px] mt-10 relative">
              <img
                src="compass/compass.png"
                alt=""
                className="absolute top-0 left-0"
                width={200}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-bottom">
                <img
                  ref={needleRef}
                  src="compass/needle2.png"
                  alt="compass needle"
                  width={50}
                  className="transition-transform duration-1000"
                />
              </div>
            </div>
          </div>
          <div className="w-full gap-10 flex flex-col items-center justify-center">
            <div
              className="cursor-pointer w-4/5 p-4 flex justify-evenly items-center text-[#273D5A] bg-slate-100 rounded-lg"
              onClick={() => {
                showDailyChart("wind_gust");
              }}
            >
              <img src="icons/windy.png" alt="sunrise" width={50} />
              <div className="flex flex-col gap-y-1 text-center">
                <p className="">Gust</p>
                <p className="text-2xl font-semibold">{data.wind_gust.toFixed(2)} kmph</p>
              </div>
            </div>
            <div
              className="cursor-pointer w-4/5 p-4 flex justify-evenly items-center text-[#273D5A] bg-slate-100 rounded-lg"
              onClick={() => {
                showDailyChart("humidity");
              }}
            >
              <img src="icons/humidity.png" alt="sunrise" width={50} />
              <div className="flex flex-col gap-y-1 text-center">
                <p className="">Humidity</p>
                <p className="text-2xl font-semibold">{data.humidity.toFixed(2)}%</p>
              </div>
              <p>{humidityStatus}</p>
            </div>
          </div>
        </>
      </div>
    </div>
  );
}

export default LeftSide;
