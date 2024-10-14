import React from "react";
import { useNavigate } from "react-router-dom";

function RightSide({ dataset }) {
  const { data, city, state, isPrevious } = dataset;
  console.log(data, city, state, isPrevious);

  const navigate = useNavigate();

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
    <div className="w-2/5 min-h-screen h-full px-5 py-2 pb-10 flex flex-col bg-[#273D5A] text-white">
      <div className="pt-5 flex flex-col gap-y-5">
        <>
          <div className="tracking-wider">
            <p className="text-2xl">{city}</p>
            <p>{state}</p>
          </div>
          {/* <div className="px-3">
            <img src="" alt="condition_icon" />
          </div> */}
          <div className="flex justify-between text-end">
            <p className="text-5xl text-start">{data.temperature.toFixed(2)} &deg;F</p>
            <div className="flex flex-col">
              <p className="text-2xl">Feels like</p>
              <p className="text-xl">{data.feels_like.toFixed(2)} &deg;F</p>
            </div>
          </div>
          <div className="flex flex-col gap-y-3">
            <h1 className="text-xl">Air Quality Index</h1>
            <div className="flex flex-wrap gap-5 justify-center items-center">
              <div
                className="w-28 h-28 py-4 px-2 bg-[#7099cf] bg-opacity-20 text-center text-white rounded-lg cursor-pointer"
                onClick={() => {
                  showDailyChart("Carbon Monooxide (Parts Per Million)");
                }}
              >
                <p className="text-xl">CO</p>
                <p className="pt-1 text-lg font-semibold">
                  {data["Carbon Monooxide (Parts Per Million)"].toFixed(2)} ppm
                </p>
              </div>
              <div
                className="w-28 h-28 py-4 px-2 bg-[#7099cf] bg-opacity-20 text-center text-white rounded-lg cursor-pointer"
                onClick={() => {
                  showDailyChart("Nitrogen Dioxide (Parts Per Million)");
                }}
              >
                <p className="text-xl">
                  NO<span className="text-sm">2</span>
                </p>
                <p className="pt-1 text-lg font-semibold">
                  {data["Nitrogen Dioxide (Parts Per Million)"].toFixed(2)} ppm
                </p>
              </div>{" "}
              <div
                className="w-28 h-28 py-4 px-2 bg-[#7099cf] bg-opacity-20 text-center text-white rounded-lg cursor-pointer"
                onClick={() => {
                  showDailyChart("Nitric Oxide (Parts Per Million)");
                }}
              >
                <p className="text-xl">NO</p>
                <p className="pt-1 text-lg font-semibold">
                  {data["Nitric Oxide (Parts Per Million)"].toFixed(2)} ppm
                </p>
              </div>
              <div
                className="w-28 h-28 py-4 px-2 bg-[#7099cf] bg-opacity-20 text-center text-white rounded-lg cursor-pointer"
                onClick={() => {
                  showDailyChart("Ozone (Parts Per Million)");
                }}
              >
                <p className="text-xl">o3</p>
                <p className="pt-1 text-lg font-semibold">
                  {data["Ozone (Parts Per Million)"].toFixed(2)} ppm
                </p>
              </div>
              <div
                className="min-w-28 h-28 py-4 px-2 bg-[#7099cf] bg-opacity-20 text-center text-white rounded-lg cursor-pointer"
                onClick={() => {
                  showDailyChart("Sulphur Dioxide (Parts Per Million)");
                }}
              >
                <p className="text-xl">so2</p>
                <p className="pt-1 text-lg font-semibold">
                  {data["Sulphur Dioxide (Parts Per Million)"].toFixed(2)} ppm
                </p>
              </div>
              <div
                className="w-28 h-28 py-4 px-2 bg-[#7099cf] bg-opacity-20 text-center text-white rounded-lg cursor-pointer"
                onClick={() => {
                  showDailyChart("solar_radiation");
                }}
              >
                <p className="text-xl">Radiation</p>
                <p className="pt-1 text-lg font-semibold">
                  {data["solar_radiation"].toFixed(2)}
                </p>
              </div>
              <div
                className="w-28 h-28 py-4 px-2 bg-[#7099cf] bg-opacity-20 text-center text-white rounded-lg cursor-pointer"
                onClick={() => {
                  showDailyChart(
                    "Particulate Matter 2.5 (Micrograms/Cubic Meter)"
                  );
                }}
              >
                <p className="text-xl">PM 2.5</p>
                <p className="pt-1 text-lg font-semibold">
                  {data["Particulate Matter 2.5 (Micrograms/Cubic Meter)"].toFixed(2)}{" "}
                  &micro;g/m<sup>3</sup>
                </p>
              </div>{" "}
              <div
                className="w-28 h-28 py-4 px-2 bg-[#7099cf] bg-opacity-20 text-center text-white rounded-lg cursor-pointer"
                onClick={() => {
                  showDailyChart(
                    "Particulate Matter 10 (Micrograms/Cubic Meter)"
                  );
                }}
              >
                <p className="text-xl">PM 10</p>
                <p className="pt-1 text-lg font-semibold">
                  {data["Particulate Matter 10 (Micrograms/Cubic Meter)"].toFixed(2)}{" "}
                  &micro;g/m<sup>3</sup>
                </p>
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
}

export default RightSide;
