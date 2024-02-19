import React, { useState, useEffect } from "react";
import { MapContainer, Polyline, TileLayer, useMap } from "react-leaflet";

function Center({polyline}) {
  const map = useMap();
  const [location, setLocation] = useState([28.7040592, 77.1024902]);

  if(polyline.length !== 0){
    map.fitBounds([polyline[0], polyline[polyline.length-1]])
  }
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

function Map({polyline}) {

  return (
    <MapContainer center={[28.7040592, 77.1024902]} zoom={10} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Center polyline={polyline}/>
      polyline? <Polyline positions={polyline} /> : null
    </MapContainer>
  );
}

export default Map;
