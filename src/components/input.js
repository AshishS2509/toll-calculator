import React from 'react';

const Input = ({ label, name, placeholder, iconClass, helpText, required }) => {
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
          />
        </div>
        <span id={`${name}HelpBlock`} className="form-text text-muted">
          {helpText}
        </span>
      </div>
    </div>
  );
}

export default Input;
