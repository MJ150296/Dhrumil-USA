import React, { useContext, useEffect, useState } from "react";
import MapComponent from "../MapComponent";
import Search from "./Search";
import { BackButtonContext, WeatherContext } from "../../App";
import { useNavigate } from "react-router-dom";

function Home() {
  const [isBackButtonClicked, setIsBackButtonClicked] =
    useContext(BackButtonContext);
  const navigate = useNavigate();

  const [position, setPosition] = useContext(WeatherContext);

  // ReverseGeocode function using Nominatim

  const reverseGeocode = async (lat, lng) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`
    );
    const data = await response.json();
    if (data && data.address) {
      navigate("/options", {
        state: {
          cityName: data.address.city || data.address.town || "Unknown",
          state: data.address.state || "Unknown",
        },
      });
      // console.log(data.address.state);

      // setSelectedCity(data.address.city || data.address.town || "Unknown");
      // console.log(
      //   `Selected city: ${data.address.city || data.address.town || "Unknown"}`
      // );

      // alert(
      //   `Selected city: ${data.address.city || data.address.town || "Unknown"}`
      // );
    } else {
      console.log("City not found");

      // alert("City not found");
    }
  };

  useEffect(() => {
    console.log(isBackButtonClicked);

    if (!isBackButtonClicked) {
      if (position) {
        const { latitude, longitude } = position;
        console.log(latitude, longitude);
        reverseGeocode(latitude, longitude); // To get the city name from lat and long
      }
    }
    setIsBackButtonClicked(false);
  }, [position]);

  return (
    <div className="w-full">
      <div className=" w-full bg-[#273D5A] flex justify-center items-center">
        <Search />
      </div>
      <MapComponent />
    </div>
  );
}

export default Home;
