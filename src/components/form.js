import React from "react";
import Input from "./input";

const Form = (props) => {

  const handelSubmit = (event) => {
    props.handelSubmit();
    event.preventDefault();
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
        handelMarker={props.handelSource}
        required
      />
      <Input
        label="Waypoint"
        name="waypoint"
        placeholder="Waypoint (optional)"
        iconClass="bi bi-geo"
        helpText="Enter Interim Stop."

      />
      <Input
        label="Destination"
        name="destination"
        placeholder="Destination"
        iconClass="bi bi-geo-alt-fill"
        helpText="Enter Destination"
        handelMarker={props.handelDestination}
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
