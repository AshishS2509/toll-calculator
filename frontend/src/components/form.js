import React, { useState } from "react";
import Input from "./input";
import polyline from "@mapbox/polyline";

const Form = (props) => {
  const [source, setSource] = useState({});
  const [destination, setDestination] = useState({});
  const [points, setPoints] = useState({});
  const [responseData, setResponseData] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentRoute, setCurrentRoute] = useState({});

  const handelSource = (name, lat, lon) => {
    setSource({ address: name, lat: lat, lng: lon });
  };
  const handelDestination = (name, lat, lon) => {
    setDestination({ address: name, lat: lat, lng: lon });
  };
  const handelPoints = (name, lat, lon) => {
    setPoints({ address: name, lat: lat, lng: lon });
  };
  const handelClick = (e, index) => {
    console.log(index);
  };

  const handelSubmit = async (event) => {
    event.preventDefault();
    const data = {
      from: source,
      to: destination,
      waypoints: points,
    };
    try {
      const response = await fetch("https://toll-api.onrender.com/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const apiData = await response.json();
      setResponseData(apiData);
      console.log(apiData);
      setCurrentRoute(apiData.routes[0]);
      props.setPolyline(polyline.decode(apiData.routes[0].polyline));
      setLoading(true);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handelSubmit}>
        <Input
          label="Origin"
          name="origin"
          placeholder="Start"
          iconclassName="bi bi-geo-alt-fill"
          helpText="Enter Origin"
          handelMarker={handelSource}
          required
        />
        <Input
          label="Waypoint"
          name="waypoint"
          placeholder="Waypoint (optional)"
          iconclassName="bi bi-geo"
          helpText="Enter Interim Stop."
          handelMarker={handelPoints}
        />
        <Input
          label="Destination"
          name="destination"
          placeholder="Destination"
          iconclassName="bi bi-geo-alt-fill"
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

      <hr />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 flex" style={{ height: 50 }}>
            {loading &&
              responseData.routes.map((route, index) => (
                <button
                  key={index}
                  type="button"
                  className="btn btn-secondary btn-block m-2 active"
                  onClick={handelClick(index)}
                >
                  {route.summary.name}
                </button>
              ))}
          </div>
        </div>

        <hr />
        <div className="row">
          <div className=" col-12 col-lg-4 bg-info text-light py-2 text-center">
            <h3 className="">Distance</h3>
            <hr className=" border border-2 border-dark" />
            {loading && (
              <div className="container">
                <h5>{currentRoute.summary.distance.metric}</h5>
                <h5>{currentRoute.summary.duration.text} travel.</h5>
              </div>
            )}
          </div>
          <div className="col-12 col-lg-4 bg-info-subtle text-black-50 text-center py-2">
            <h3 className="">Petrol</h3>
            <hr className=" border border-2 border-dark" />
            {loading && (
              <div className="container">
                <h5>
                  {(
                    currentRoute.costs.fuel /
                    responseData.summary.fuelPrice.value
                  ).toFixed(2)}{" "}
                  lit required.
                </h5>
                <h5>{currentRoute.costs.fuel} Rs. /-</h5>
              </div>
            )}
          </div>
          <div className="col-12 col-lg-4 bg-info text-light py-2 text-center ">
            <h3 className="">Toll</h3>
            <hr className=" border border-2 border-dark" />
            {loading && (
              <div className="container">
                <h5>{currentRoute.tolls.length} Tolls in route.</h5>
                <h5>
                  Toll price:{" "}
                  <h6>{currentRoute.costs.minimumTollCost} Rs. /- by Tag</h6>
                  <h6>{currentRoute.costs.cash} Rs. /- by Cash</h6>
                </h5>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
