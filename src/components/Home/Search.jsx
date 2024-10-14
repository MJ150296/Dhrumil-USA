import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  SearchTermContext,
  SuggestionContext,
  WeatherContext,
} from "../../App.jsx";

function Search() {
  const [searchTerm, setSearchTerm] = useContext(SearchTermContext);
  const [suggestion, setSuggestion] = useState([]);
  const [showsuggestion, setShowSuggestion] = useContext(SuggestionContext);

  const [position, setPosition] = useContext(WeatherContext);

  const fetchWeather = (city) => {
    // console.log(city.lat, city.lon);
    setPosition({
      latitude: city.lat,
      longitude: city.lon,
    });
    // console.log(city);
    
    setShowSuggestion(false);
    // setSearchTerm("");

    // const url = `https://yahoo-weather5.p.rapidapi.com/weather?lat=${latitude}&long=${longitude}&format=json&u=f`;
    // const options = {
    //   method: "GET",
    //   headers: {
    //     "x-rapidapi-key": "254d5bbddfmshbd33e73bfa0f653p1c6485jsn07029bccb407",
    //     "x-rapidapi-host": "yahoo-weather5.p.rapidapi.com",
    //   },
    // };

    // try {
    //   const response = await fetch(url, options);
    //   const result = await response.text();
    //   console.log(result);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleSearch = async (event) => {
    setSearchTerm(event.target.value);
    // console.log(event.target.value);
    if (searchTerm.length >= 2) {
      const apiURL = `https://nominatim.openstreetmap.org/search?q=${event.target.value}&format=json`;
      await axios
        .get(apiURL)
        .then((response) => {
          // console.log(response.data);
          setSuggestion(response.data);
        })
        .catch((err) => {
          console.log("Errors are : ", err);
        });
    } else {
      setSuggestion([]);
    }
  };

  useEffect(() => {
    // console.log(searchTerm);
    // console.log(showsuggestion);
    if (searchTerm === "") {
      setShowSuggestion(false);
    } else {
      setShowSuggestion(true);
    }
    if (suggestion.length > 0) {
      setShowSuggestion(true);
    } else {
      setShowSuggestion(false);
    }
  }, [suggestion, searchTerm]);

  return (
    <div className="w-1/3 flex flex-col">
      <div className="relative p-2 px-5 flex flex-col">
        <input
          type="text"
          placeholder="Search location here"
          className="bg-white p-2 rounded-full placeholder-black border-b border-black
           pl-10 tracking-wider focus:outline-none"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="absolute left-8 bottom-5 text-black">
          <img
            src="searchBar.png"
            alt="search Icon"
            width={20}
            className="cursor-pointer"
          />
        </div>
        {showsuggestion && (
          <div className="suggestionBox absolute top-10 w-11/12 h-60 p-2 z-10 bg-[#273D5A] bg-opacity-80 text-white rounded-lg shadow-lg overflow-y-auto scroll-smooth">
            {suggestion.map((city, index) => {
              return (
                <li
                  key={index}
                  className="cursor-pointer border-black border-b py-1"
                  onClick={() => fetchWeather(city)}
                >
                  {city.display_name}
                </li>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
