import React, { useState } from "react";
import { MonthPicker } from "react-dropdown-date";

const MonthPickerWrapper = (props) => {
  const [has_value, setValue] = useState(false);

  const setValueHandler = (month) => {
    if (month) setValue(true);
    else setValue(false);

    props.onChange(month);
  };

  return (
    <>
      <div
        className={`input-container ${
          props.containerClassName ? props.containerClassName : ""
        }`}
      >
        <MonthPicker
          classes={`select-months form-field ${
            props.className ? props.className : ""
          }`}
          caps
          required={props.required || false}
          disabled={props.disabled || false}
          onChange={(month) => setValueHandler(month)}
        />
        <label className={`form-label ${has_value ? "filled" : ""}`}>
          {props.placeholder}
        </label>
      </div>
    </>
  );
};

export default MonthPickerWrapper;
