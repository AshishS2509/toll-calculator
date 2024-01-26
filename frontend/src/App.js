"use client";
import { useState, useEffect } from "react";
import Form from "./components/form";
import Map from "./components/map";


function App() {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [polylineCoded, setPolylineCoded] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      },
      (error) => {
        console.log(error);
      },
      [{ enableHighAccuracy: true }]
    );
  }, []);


  return (
    <div className="d-flex container full align-items-center m-auto p-0">
      <div className="row py-5 full mx-auto w-100">
        <Form polyline = {setPolylineCoded}/>
        <Map latitude={lat} longitude={lon} polyline = {polylineCoded}/>
      </div>
    </div>
  );
}

export default App;
