import React, { useState } from "react";
import Select from "react-select";

const SelectWrapper = (props) => {
  const [hasValue, setValue] = useState(false);

  const setValueHandler = (e) => {
    if (e.value) setValue(true);
    else setValue(false);
    props.onChange(e);
  };

  return (
    <>
      <div
        className={`select-container ${
          props.containerClassName ? props.containerClassName : ""
        }`}
      >
        <Select
          defaultValue={props.value}
          className={`${props.className ? props.className : ""}`}
          onChange={(e) => {
            setValueHandler(e);
          }}
          options={props.options}
          isSearchable={false}
        />
        {props.placeholder && (
          <label
            className={`form-label ${hasValue || props.value ? "filled" : ""} `}
          >
            {props.placeholder}
          </label>
        )}
      </div>
    </>
  );
};

export default SelectWrapper;
