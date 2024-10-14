import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { SuggestionContext, WeatherContext } from "../App";

function MapComponent() {
  const [showsuggestion, setShowSuggestion] = useContext(SuggestionContext);
  const [position, setPosition] = useContext(WeatherContext);
  const [latitude, setLatitude] = useState(34.7039);
  const [longitude, setLongitude] = useState(-118.1481);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition({
          latitude: lat,
          longitude: lng,
        });
        // alert(`Selected coordinates: Latitude: ${lat}, Longitude: ${lng}`);
      },
    });
    return null;
  };

  const ChangeView = ({ center }) => {
    const map = useMap();
    map.setView(center); // Manually update the map's center
    return null;
  };

  useEffect(() => {
    if (position) {
      setLatitude(position.latitude);
      setLongitude(position.longitude);
    }
  }, [position]);
  return (
    <div className={`relative ${showsuggestion ? "-z-20" : "z-0"}`}>
      <MapContainer
        center={[latitude, longitude]}
        zoom={10}
        style={{ height: "770px", width: "100%" }} // Size of the map container
        // className="w-full h-screen"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeView center={[latitude, longitude]} />
        {/* This above line  will center the map again whenever the position changes. */}
        <LocationMarker />
      </MapContainer>
    </div>
  );
}

export default MapComponent;
