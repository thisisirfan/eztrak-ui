import React from "react";
import Select from "react-select";

export default function Dropdown({ options, value, ...otherProps }) {
  
  let currentOptions = options;
  if (value?.options) {
    currentOptions = value?.options;
  }

  function getSelectedValue(val = "") {
    return currentOptions?.find(({ value }) => value == val);
  }
  return (
    <Select
      className="dropdown-input"
      options={currentOptions}
      {...otherProps}
      value={getSelectedValue(value)}
    />
  );
}
