import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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

  const { pollutant, date, city, state, isPrevious } = location.state || {};
  console.log(pollutant, date, city, state, isPrevious);

  const fetchHourlyFromCloudinary = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP Error Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setIsChartDataLoaded(true);

      const { Sheet1 } = data;

      if (Sheet1) {
        const reqData = Sheet1.filter((entry) => {
          const onlyDate = entry.combined_datetime.split(" ")[0];
          return onlyDate === date;
        });

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
      if (isPrevious && city === "Lancaster") {
        const startDate = new Date("2022-01-01");
        const endDate = new Date("2022-08-31");

        if (checkDate >= startDate && checkDate <= endDate) {
          const url =
            "https://res.cloudinary.com/dzmjjm2kn/raw/upload/v1728676781/past_hourly_ieqf8e.json";
          fetchHourlyFromCloudinary(url);
        } else {
          const url =
            "https://res.cloudinary.com/dzmjjm2kn/raw/upload/v1728676794/past_hourly_1_d4szvz.json";
          fetchHourlyFromCloudinary(url);
        }
      }
      if (!isPrevious && city === "Lancaster") {
        const url =
          "https://res.cloudinary.com/dzmjjm2kn/raw/upload/v1728763420/forecast_hourly_bppnpy.json";
        fetchHourlyFromCloudinary(url);
      }
    }
  }, [pollutantData, pollutant]);
  return (
    <div className="w-full flex flex-col gap-y-10">
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
