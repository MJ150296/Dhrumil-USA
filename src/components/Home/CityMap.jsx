import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Polygon, useMap } from "react-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";

// Custom component to handle setting the map view
const ChangeView = ({ bounds }) => {
  const map = useMap();
  if (bounds) {
    // Fit the map to the bounds of the selected city
    map.fitBounds(bounds);
  }
  return null;
};

const CityMap = () => {
  const [city, setCity] = useState("");
  const [cityBounds, setCityBounds] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const provider = new OpenStreetMapProvider();

  const handleSearch = async (e) => {
    e.preventDefault();

    const results = await provider.search({ query: city });
    if (results.length > 0) {
      const { bounds } = results[0]; // Get the bounds of the city
      setCityBounds(bounds); // Update the state with the bounds
      setSuggestions([]); // Clear suggestions after selection
    } else {
      alert("City not found");
    }
  };

  const handleInputChange = async (e) => {
    const input = e.target.value;
    setCity(input);

    if (input.length > 2) {
      const results = await provider.search({ query: input });
      setSuggestions(results); // Update suggestions state
    } else {
      setSuggestions([]); // Clear suggestions if input is less than 3 characters
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion.label); // Set city input to selected suggestion
    const bounds = suggestion.bounds;
    setCityBounds(bounds); // Set bounds from selected suggestion
    setSuggestions([]); // Clear suggestions
  };

  return (
    <div className="relative w-full h-screen">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Search for a city"
          className="border rounded p-2"
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </form>

      {suggestions.length > 0 && (
        <ul className="absolute top-10 left-0 bg-white border rounded shadow-lg z-10 w-full">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {suggestion.label}
            </li>
          ))}
        </ul>
      )}

      <MapContainer
        className={`${suggestions ? "-z-10" : "z-0"}`}
        center={[51.505, -0.09]} // Default center
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <ChangeView bounds={cityBounds} />{" "}
        {/* Custom component to change map view */}
        {cityBounds && (
          <Polygon
            positions={[
              [cityBounds[1][0], cityBounds[1][1]],
              [cityBounds[0][0], cityBounds[0][1]],
              [cityBounds[1][0], cityBounds[0][1]],
              [cityBounds[0][0], cityBounds[1][1]],
            ]}
            color="blue"
          />
        )}
      </MapContainer>
    </div>
  );
};

export default CityMap;
