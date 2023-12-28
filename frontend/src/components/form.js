import React from "react";

const Form = () => {
  return (
    <div className="col-4">
      <form>
        <div className="form-group row pb-4">
          <label className="col-4 col-form-label" htmlFor="origin">
            Origin
          </label>
          <div className="col-8">
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text h-100 rounded-end-0 ">
                  <i className="fa fa-map-marker"></i>
                </div>
              </div>
              <input
                id="origin"
                name="origin"
                placeholder="Start"
                type="text"
                className="form-control"
                aria-describedby="originHelpBlock"
                required="required"
              />
            </div>
            <span id="originHelpBlock" className="form-text text-muted">
              Enter Origin
            </span>
          </div>
        </div>
        <div className="form-group row pb-4">
          <label htmlFor="waypoint" className="col-4 col-form-label">
            Waypoint
          </label>
          <div className="col-8">
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text h-100 rounded-end-0 ">
                  <i className="fa fa-map-pin"></i>
                </div>
              </div>
              <input
                id="waypoint"
                name="waypoint"
                placeholder="Waypoint ( optional )"
                type="text"
                aria-describedby="waypointHelpBlock"
                className="form-control"
              />
            </div>
            <span id="waypointHelpBlock" className="form-text text-muted">
              Enter Interim Stop.
            </span>
          </div>
        </div>
        <div className="form-group row pb-4">
          <label htmlFor="destination" className="col-4 col-form-label">
            Destination
          </label>
          <div className="col-8">
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text h-100 rounded-end-0 ">
                  <i className="fa fa-map-marker"></i>
                </div>
              </div>
              <input
                id="destination"
                name="destination"
                placeholder="Destination"
                type="text"
                className="form-control"
                aria-describedby="destinationHelpBlock"
                required="required"
              />
            </div>
            <span id="destinationHelpBlock" className="form-text text-muted">
              Enter Destination
            </span>
          </div>
        </div>
        <div className="form-group row">
          <div className="offset-4 col-8">
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
