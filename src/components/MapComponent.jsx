import React, { useContext, useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Circle,
  useMap,
  useMapEvents,
  Polygon,
} from "react-leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { SuggestionContext, WeatherContext } from "../App";
import { ChoroplethColorContext } from "./Home/Home";

function MapComponent({ address }) {
  const [showsuggestion, setShowSuggestion] = useContext(SuggestionContext);
  const [position, setPosition] = useContext(WeatherContext);
  const [latitude, setLatitude] = useState(34.0686);
  const [longitude, setLongitude] = useState(-118.0276);
  const defaultRadius = 9000; // Radius in meters (e.g., 10 km)
  const [isChoroplethVisible, setIsChoroplethVisible] = useState(false);

  const [choroplethData, setChoroplethData] = useContext(
    ChoroplethColorContext
  );

  const [choroplethCordinates, setChoroplethCordinates] = useState();

  // const areas = [
  //   {
  //     name: "Riverside",
  //     coordinates: [
  //       [33.9271, -117.0234],
  //       [33.9271, -117.0456],
  //       [33.9154, -117.0578],
  //       [33.8967, -117.0789],
  //       [33.8823, -117.0645],
  //       [33.8712, -117.0523],
  //       [33.8634, -117.0345],
  //       [33.8365, -117.0],
  //       [33.8565, -117.01],
  //       [33.8745, -116.9899],
  //       [33.8934, -116.9878],
  //       [33.9123, -116.9778],
  //       [33.9256, -116.9888],
  //       [33.9271, -117.0234],
  //     ],
  //   },
  //   {
  //     name: "Santa Clarita",
  //     coordinates: [
  //       [34.561444, -118.63475],
  //       [34.57175, -118.63875],
  //       [34.576194, -118.647333],
  //       [34.578417, -118.653056],
  //       [34.57075, -118.657889],
  //       [34.564083, -118.657861],
  //       [34.567806, -118.662944],
  //       [34.558278, -118.671667],
  //       [34.559417, -118.674861],
  //       [34.551694, -118.667389],
  //       [34.545333, -118.663889],
  //       [34.534222, -118.652972],
  //       [34.529472, -118.650417],
  //       [34.524917, -118.653083],
  //       [34.517556, -118.648389],
  //       [34.516861, -118.643722],
  //       [34.518611, -118.639083],
  //       [34.515694, -118.630528],
  //       [34.512444, -118.623083],
  //       [34.511528, -118.619833],
  //       [34.511944, -118.613889],
  //       [34.519889, -118.619778],
  //       [34.523944, -118.614306],
  //       [34.561444, -118.63475],
  //     ],
  //   },
  //   {
  //     name: "San Bernardino",
  //     coordinates: [
  //       [35.4467004, -115.1261601],
  //       [35.4278863, -115.1128673],
  //       [35.4197246, -115.1275993],
  //       [35.422851, -115.1129802],
  //       [35.4090559, -115.1092456],
  //       [35.4074046, -115.0966053],
  //       [35.3897069, -115.0996981],
  //       [35.3861892, -115.0885278],
  //       [35.3765273, -115.1016547],
  //       [35.3702026, -115.0936336],
  //       [35.3504205, -115.1078254],
  //       [35.3256324, -115.1025115],
  //       [35.3030448, -115.1276217],
  //       [35.2745767, -115.1195866],
  //       [35.2814281, -115.1547094],
  //       [35.2730797, -115.1515288],
  //       [35.2670373, -115.1724262],
  //       [35.2505646, -115.1624111],
  //       [35.2713102, -115.1801963],
  //       [35.2721387, -115.2077908],
  //       [35.2580991, -115.1861726],
  //       [35.2524678, -115.1996976],
  //       [35.264389, -115.2232099],
  //       [35.242569, -115.2125269],
  //       [35.2317529, -115.2380212],
  //       [35.2245279, -115.2201809],
  //       [35.2180957, -115.2294712],
  //       [35.2158709, -115.2074823],
  //       [35.2046688, -115.2142129],
  //       [35.1652331, -115.1750204],
  //       [35.1629566, -115.1944456],
  //       [35.1377934, -115.1653663],
  //       [35.1347646, -115.1930334],
  //       [35.148605, -115.2225083],
  //       [35.1395209, -115.2205385],
  //       [35.1405033, -115.2296824],
  //       [35.197556, -115.3215049],
  //       [35.2140634, -115.3229269],
  //       [35.2288745, -115.3090345],
  //       [35.2500272, -115.314446],
  //       [35.2482867, -115.2926494],
  //       [35.2221055, -115.2936742],
  //       [35.2289998, -115.2826322],
  //       [35.2553225, -115.2914461],
  //       [35.2582543, -115.279398],
  //       [35.2973755, -115.2930162],
  //       [35.3048562, -115.2993716],
  //       [35.3018528, -115.3150532],
  //       [35.3371603, -115.3141497],
  //       [35.3354003, -115.2875174],
  //       [35.3177749, -115.2597],
  //       [35.3381851, -115.2764633],
  //       [35.3394561, -115.2636533],
  //       [35.3239623, -115.2563387],
  //       [35.3298371, -115.2508502],
  //       [35.3483794, -115.2497067],
  //       [35.3560078, -115.2672547],
  //       [35.3676874, -115.2601032],
  //       [35.3822564, -115.221578],
  //       [35.3986576, -115.2244852],
  //       [35.4130614, -115.196929],
  //       [35.4761405, -115.1408474],
  //       [35.4587707, -115.118677],
  //     ],
  //   },
  // ];

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

  useEffect(() => {
    if (address) {
      console.log("address", address);
      const { cityName, state } = address;
      if (cityName === "Santa Clarita") {
        setChoroplethCordinates([
          [34.561444, -118.63475],
          [34.57175, -118.63875],
          [34.576194, -118.647333],
          [34.578417, -118.653056],
          [34.57075, -118.657889],
          [34.564083, -118.657861],
          [34.567806, -118.662944],
          [34.558278, -118.671667],
          [34.559417, -118.674861],
          [34.551694, -118.667389],
          [34.545333, -118.663889],
          [34.534222, -118.652972],
          [34.529472, -118.650417],
          [34.524917, -118.653083],
          [34.517556, -118.648389],
          [34.516861, -118.643722],
          [34.518611, -118.639083],
          [34.515694, -118.630528],
          [34.512444, -118.623083],
          [34.511528, -118.619833],
          [34.511944, -118.613889],
          [34.519889, -118.619778],
          [34.523944, -118.614306],
          [34.561444, -118.63475],
        ]);
      } else if (cityName === "Riverside") {
        setChoroplethCordinates([
          [33.9271, -117.0234],
          [33.9271, -117.0456],
          [33.9154, -117.0578],
          [33.8967, -117.0789],
          [33.8823, -117.0645],
          [33.8712, -117.0523],
          [33.8634, -117.0345],
          [33.8365, -117.0],
          [33.8565, -117.01],
          [33.8745, -116.9899],
          [33.8934, -116.9878],
          [33.9123, -116.9778],
          [33.9256, -116.9888],
          [33.9271, -117.0234],
        ]);
      } else if (cityName === "San Bernardino") {
        setChoroplethCordinates([
          [35.4467004, -115.1261601],
          [35.4278863, -115.1128673],
          [35.4197246, -115.1275993],
          [35.422851, -115.1129802],
          [35.4090559, -115.1092456],
          [35.4074046, -115.0966053],
          [35.3897069, -115.0996981],
          [35.3861892, -115.0885278],
          [35.3765273, -115.1016547],
          [35.3702026, -115.0936336],
          [35.3504205, -115.1078254],
          [35.3256324, -115.1025115],
          [35.3030448, -115.1276217],
          [35.2745767, -115.1195866],
          [35.2814281, -115.1547094],
          [35.2730797, -115.1515288],
          [35.2670373, -115.1724262],
          [35.2505646, -115.1624111],
          [35.2713102, -115.1801963],
          [35.2721387, -115.2077908],
          [35.2580991, -115.1861726],
          [35.2524678, -115.1996976],
          [35.264389, -115.2232099],
          [35.242569, -115.2125269],
          [35.2317529, -115.2380212],
          [35.2245279, -115.2201809],
          [35.2180957, -115.2294712],
          [35.2158709, -115.2074823],
          [35.2046688, -115.2142129],
          [35.1652331, -115.1750204],
          [35.1629566, -115.1944456],
          [35.1377934, -115.1653663],
          [35.1347646, -115.1930334],
          [35.148605, -115.2225083],
          [35.1395209, -115.2205385],
          [35.1405033, -115.2296824],
          [35.197556, -115.3215049],
          [35.2140634, -115.3229269],
          [35.2288745, -115.3090345],
          [35.2500272, -115.314446],
          [35.2482867, -115.2926494],
          [35.2221055, -115.2936742],
          [35.2289998, -115.2826322],
          [35.2553225, -115.2914461],
          [35.2582543, -115.279398],
          [35.2973755, -115.2930162],
          [35.3048562, -115.2993716],
          [35.3018528, -115.3150532],
          [35.3371603, -115.3141497],
          [35.3354003, -115.2875174],
          [35.3177749, -115.2597],
          [35.3381851, -115.2764633],
          [35.3394561, -115.2636533],
          [35.3239623, -115.2563387],
          [35.3298371, -115.2508502],
          [35.3483794, -115.2497067],
          [35.3560078, -115.2672547],
          [35.3676874, -115.2601032],
          [35.3822564, -115.221578],
          [35.3986576, -115.2244852],
          [35.4130614, -115.196929],
          [35.4761405, -115.1408474],
          [35.4587707, -115.118677],
        ]);
      } else {
        setChoroplethCordinates(0);
      }
    }
  }, [address]);

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
          // <Polygon
          //   positions={choroplethCordinates}
          //   pathOptions={{
          //     color: choroplethData || "blue",
          //     fillColor: choroplethData || "blue",
          //     fillOpacity: 0.4,
          //   }}
          // />
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
