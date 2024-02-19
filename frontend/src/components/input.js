import { City } from "country-state-city";
import React, { useState } from "react";

const Input = ({ label, name, placeholder, iconClass, helpText, required, handelMarker }) => {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  
  const countryData = City.getCitiesOfCountry("IN");

  const handelInput = async (event) => {
    setInput(event.target.value);
    const filteredCities = countryData.filter((city) =>
      city.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSuggestions(filteredCities);
  };
  const handleInputFocus = () => {
    setIsFocused(true);
  };
  const handelInputBlur = () => {
    setIsFocused(false);
  };
  const handelList = async (index) => {
    const value = suggestions[index];
    const name = value.name + ", " + value.stateCode + ", " + value.countryCode
    handelMarker(name, Number(value.latitude), Number(value.longitude))
    setInput(value.name + ", " + value.stateCode );
    setIsFocused(false);
  };

  return (
    <div className="form-group row pb-4">
      <label className="col-4 col-form-label" htmlFor={name}>
        {label}
      </label>
      <div className="col-8">
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text h-100 rounded-end-0">
              <i className={iconClass}></i>
            </div>
          </div>
          <input
            id={name}
            name={name}
            placeholder={placeholder}
            type="text"
            className="form-control"
            aria-describedby={`${name}HelpBlock`}
            required={required}
            onChange={handelInput}
            onFocus={handleInputFocus}
            onBlur={handelInputBlur}
            value={input}
          />

          {isFocused && (
            <ul
              className="list-group position-absolute w-100 top-100 z-3 overflow-y-scroll border border-gray"
              style={{ cursor: "pointer", maxHeight:"200px" }}
            >
              {/* <li key={0} className="list-group-item fw-semibold text-primary" onMouseDown={handelCurrentLocation}><i className="bi bi-crosshair"></i> Current City</li> */}
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  className="list-group-item w-100"
                  onMouseDown={() => handelList(index)}
                >
                  {item.name + ", " + item.stateCode}
                </li>
              ))}
            </ul>
          )}
        </div>
        <span id={`${name}HelpBlock`} className="form-text text-muted">
          {helpText}
        </span>
      </div>
    </div>
  );
};

export default Input;
