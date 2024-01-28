import React, {useState} from "react";
import Input from "./input";

const Form = (props) => {

  const [source, setSource] = useState({});
  const [destination, setDestination] = useState({});
  const [points, setPoints] = useState({});
  
  const handelSource = (name, lat, lon) => {
    setSource({ address: name, lat: lat, lng: lon });
  };
  const handelDestination = (name, lat, lon) => {
    setDestination({ address: name, lat: lat, lng: lon });
  };
  const handelPoints = (name, lat, lon) => {
    setPoints({ address: name, lat: lat, lng: lon })
  }

  const handelSubmit = async (event) => {
    event.preventDefault();
    const data = {
      from:source,
      to:destination,
      waypoints:points
    }

    try {
      const response = await fetch('http://localhost:3001/getData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      const responseData = await response.json();
      const polyline = responseData.routes.map(item => item.polyline)
      props.polyline(polyline);
    } catch (error) {
      console.error('API Error:', error);
    }
  }

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
    </div>
  );
};

export default Form;
