import React, { useContext, useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Circle,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { SuggestionContext, WeatherContext } from "../App";
import { ChoroplethColorContext } from "./Home/Home";

function MapComponent() {
  const [showsuggestion, setShowSuggestion] = useContext(SuggestionContext);
  const [position, setPosition] = useContext(WeatherContext);
  const [latitude, setLatitude] = useState(34.0686);
  const [longitude, setLongitude] = useState(-118.0276);
  const defaultRadius = 9000; // Radius in meters (e.g., 10 km)
  const [isChoroplethVisible, setIsChoroplethVisible] = useState(false);

  const [choroplethData, setChoroplethData] = useContext(
    ChoroplethColorContext
  );

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition({
          latitude: lat,
          longitude: lng,
        });
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
      setIsChoroplethVisible(true);
    }
  }, [position]);

  useEffect(() => {
    if (choroplethData) {
      console.log("choroplethData", choroplethData);
    }
  }, [choroplethData]);

  return (
    <div className={`relative ${showsuggestion ? "-z-20" : "z-0"}`}>
      <MapContainer
        center={[latitude, longitude]}
        zoom={9}
        style={{ height: "770px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeView center={[latitude, longitude]} />
        <LocationMarker />

        {/* Circle around city location to create a choropleth-like effect */}
        {isChoroplethVisible ? (
          <Circle
            center={[latitude, longitude]}
            radius={defaultRadius}
            pathOptions={{
              color: choroplethData || "blue",
              fillColor: choroplethData || "blue",
              fillOpacity: 0.4,
            }}
          />
        ) : (
          <>
            <Circle
              center={[34.3917, -118.5426]}
              radius={defaultRadius}
              pathOptions={{
                fillColor: "blue",
                fillOpacity: 0.4,
              }}
            />
            <Circle
              center={[33.9824, -117.3742]}
              radius={defaultRadius}
              pathOptions={{
                fillColor: "blue",
                fillOpacity: 0.4,
              }}
            />
            <Circle
              center={[34.1083, -117.2898]}
              radius={defaultRadius}
              pathOptions={{
                fillColor: "blue",
                fillOpacity: 0.4,
              }}
            />
          </>
        )}
      </MapContainer>
    </div>
  );
}

export default MapComponent;
