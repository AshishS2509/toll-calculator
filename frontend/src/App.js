"use client";
import { useState } from "react";
import Form from "./components/form";
import Map from "./components/map";

function App() {

  const [polyline, setPolyline] = useState([]);

  return (
    <div className="d-flex container align-items-center m-auto p-0">
      <div className="row py-5 mx-auto w-100 mb-5">
        <div className="col-lg-7">
          <Form setPolyline={setPolyline}/>
        </div>
        <div className="col-lg-5">
          <Map polyline={polyline}/>
        </div>
      </div>
    </div>
  );
}

export default App;
