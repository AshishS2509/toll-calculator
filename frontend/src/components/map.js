import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

function Center() {
  const map = useMap();
  const [location, setLocation] = useState([28.7040592, 77.1024902]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) =>{
        setLocation([position.coords.latitude, position.coords.longitude])
        map.flyTo(location, 10)
      },
      (error) => console.log(error),
      { enableHighAccuracy: true }
    );
  });
  
  return null
}

function Map() {

  return (
    <MapContainer center={[28.7040592, 77.1024902]} zoom={10} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Center />
    </MapContainer>
  );
}

export default Map;
