import React, { useState } from "react";

const Input = (props) => {
  const [hasValue, setValue] = useState(false);

  const setValueHandler = (e) => {
    if (e.target.value) setValue(true);
    else setValue(false);
    props.onChange(e.target.value);
  };

  return (
    <>
      <div
        className={`input-container ${
          props.containerClassName ? props.containerClassName : ""
        }`}
      >
        <input
          type={props.type}
          className={`form-field ${props.className ? props.className : ""}`}
          autoFocus={props.autoFocus || false}
          value={props.value}
          onChange={(e) => {
            setValueHandler(e);
          }}
          onBlur={(e) => {
            if (props.onBlur) props.onBlur(e.currentTarget.value);
          }}
        />

        <label
          className={`form-label ${hasValue || props.value ? "filled" : ""} `}
        >
          {props.placeholder}
        </label>
      </div>
    </>
  );
};

export default Input;
