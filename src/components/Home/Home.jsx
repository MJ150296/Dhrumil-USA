import React, { createContext, useContext, useEffect, useState } from "react";
import MapComponent from "../MapComponent";
import Search from "./Search";
import { BackButtonContext, WeatherContext } from "../../App";
import { useNavigate } from "react-router-dom";
import OptionsPage1 from "../OptionsPage1";
import Dashboard from "../Dashboard";
export const AddressContext = createContext();
export const ChoroplethColorContext = createContext();

function Home() {
  const [address, setAddress] = useState({});

  const [isBackButtonClicked, setIsBackButtonClicked] =
    useContext(BackButtonContext);
  const navigate = useNavigate();

  const [position, setPosition] = useContext(WeatherContext);
  const [choroplethData, setChoroplethData] = useState({});

  // ReverseGeocode function using Nominatim

  const reverseGeocode = async (lat, lng) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`
    );
    const data = await response.json();
    if (data && data.address) {
      setAddress({
        cityName: data.address.city || data.address.town || "Unknown",
        state: data.address.state || "Unknown",
      });
      // navigate("/options", {
      //   state: {
      //     cityName: data.address.city || data.address.town || "Unknown",
      //     state: data.address.state || "Unknown",
      //   },
      // });
    } else {
      console.log("City not found");
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
    <>
      <AddressContext.Provider value={[address, setAddress]}>
        <ChoroplethColorContext.Provider
          value={[choroplethData, setChoroplethData]}
        >
          <div className="w-full flex">
            <div className="w-1/2 flex flex-col">
              <div className="bg-[#273D5A] flex justify-center items-center">
                <Search />
              </div>
              <MapComponent />
            </div>
            <div className="w-1/2 flex flex-col bg-[#273D5A]">
              <OptionsPage1 />
            </div>
          </div>
        </ChoroplethColorContext.Provider>
      </AddressContext.Provider>
    </>
  );
}

export default Home;
