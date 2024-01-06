"use client"
import { useState,useEffect } from "react";
import Form from "./components/form";
import Map from "./components/map";

function App() {

      
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);

  // Fetching the API once when the component is mounted
  useEffect(() => {
    fetch('https://ipapi.co/json/').then(data => data.json()).then(res => {
      console.log(res)
      setLat(res.latitude);
      setLon(res.longitude);
    });
  }, [lat, lon]);


  return (
    <div className="d-grid d-sm-flex container full align-items-center">
      <div className="row p-5 full mx-auto ">
          <Form />
          <Map latitude = {lat} longitude = {lon} />
      </div>
    </div>
  );
}

export default App;
