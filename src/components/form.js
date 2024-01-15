import React from "react";
import Input from "./input";

const Form = () => {

  const handelSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div className="col-lg-5">
      <form onSubmit={handelSubmit}>
      <Input
        label="Origin"
        name="origin"
        placeholder="Start"
        iconClass="fa fa-map-marker"
        helpText="Enter Origin"
        required
      />
      <Input
        label="Waypoint"
        name="waypoint"
        placeholder="Waypoint (optional)"
        iconClass="fa fa-map-pin"
        helpText="Enter Interim Stop."
      />
      <Input
        label="Destination"
        name="destination"
        placeholder="Destination"
        iconClass="fa fa-map-marker"
        helpText="Enter Destination"
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
