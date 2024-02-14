import React, { useState } from "react";
import Input from "./input";

const Form = (props) => {
  const [source, setSource] = useState({});
  const [destination, setDestination] = useState({});
  const [points, setPoints] = useState({});
  const [responseData, setResponseData] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentRoute, setCurrentRoute] = useState({})

  const handelSource = (name, lat, lon) => {
    setSource({ address: name, lat: lat, lng: lon });
  };
  const handelDestination = (name, lat, lon) => {
    setDestination({ address: name, lat: lat, lng: lon });
  };
  const handelPoints = (name, lat, lon) => {
    setPoints({ address: name, lat: lat, lng: lon });
  };

  const handelSubmit = async (event) => {
    event.preventDefault();
    const data = {
      from: source,
      to: destination,
      waypoints: points,
    };

    try {
      const response = await fetch("http://localhost:3001/getData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const apiData = await response.json()
      setResponseData(apiData);
      setCurrentRoute(apiData.routes[0])
      setLoading(true);
    } catch (error) {
      console.error("API Error:", error);
    }

  };

  return (
    <div className="col-lg-5">
      <form onSubmit={handelSubmit}>
        <Input
          label="Origin"
          name="origin"
          placeholder="Start"
          iconClass="bi bi-geo-alt-fill"
          helpText="Enter Origin"
          handelMarker={handelSource}
          required
        />
        <Input
          label="Waypoint"
          name="waypoint"
          placeholder="Waypoint (optional)"
          iconClass="bi bi-geo"
          helpText="Enter Interim Stop."
          handelMarker={handelPoints}
        />
        <Input
          label="Destination"
          name="destination"
          placeholder="Destination"
          iconClass="bi bi-geo-alt-fill"
          helpText="Enter Destination"
          handelMarker={handelDestination}
          required
        />
        <div className="form-group row">
          <div className="offset-4 col col-8">
            <button name="submit" type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>

      {loading && responseData.routes.map((route,index)=> <button key={index} className="btn btn-outline-dark mx-1 mt-3 w-50 pe-2">{route.summary.name}</button>)}
      {loading && 
      <div className="container mt-4 py-2">
          <div className="px-4 mx-auto ">
            <h5 className="mt-2">Distance</h5> 
            <div>
              <div>Distance : {currentRoute.summary.distance.metric}</div>
              <div>Time : {currentRoute.summary.duration.text}</div>
            </div>
            <hr />
            <h5 className="mt-2">Petrol</h5>
            <div>
              <div>Quantity : {(currentRoute.costs.fuel/responseData.summary.fuelPrice.value).toFixed(2)}</div>
              <div>Cost : {(currentRoute.costs.fuel)} Rs. /-</div>
            </div>
            <hr />
            <h5 className="mt-2">Toll</h5>
            <div>
              <div>Tolls : {currentRoute.tolls.length}</div>
              <div>Charges : {currentRoute.costs.cash} Rs. /-</div>
            </div>
          </div>

          {console.log(responseData)}
        </div>
      }
    </div>
  );
};

export default Form;
