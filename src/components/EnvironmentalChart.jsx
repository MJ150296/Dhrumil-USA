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
      // console.log(data);
      setIsChartDataLoaded(true);

      const { Sheet1 } = data;

      console.log(Sheet1);

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
            "https://res.cloudinary.com/data298b/raw/upload/v1729987284/Past_Hourly_Jan-Dec2022_fygrb1.json";
          fetchHourlyFromCloudinary(url);
        } else {
          const url =
            "https://res.cloudinary.com/data298b/raw/upload/v1729987286/Past_Hourly_Jan2023_-_May_2023_end_csv_yvsa64.json";
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
