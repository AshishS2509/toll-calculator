"use client";
import { useState, useEffect } from "react";
import Form from "./components/form";
import Map from "./components/map";

function App() {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [source, setSource] = useState({});
  const [destination, setDestination] = useState({});

  const handelSource = (name, lat, lon) => {
    setSource({ address: name, lat: lat, lng: lon });
  };
  const handelDestination = (name, lat, lon) => {
    setDestination({ address: name, lat: lat, lng: lon });
  };
  const handelSubmit = async () => {
    console.log(source, destination)
  };

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
        <Form
          handelSource={handelSource}
          handelDestination={handelDestination}
          handelSubmit={handelSubmit}
        />
        <Map latitude={lat} longitude={lon} />
      </div>
    </div>
  );
}

export default App;
