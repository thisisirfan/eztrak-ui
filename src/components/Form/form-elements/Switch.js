import React, { useState } from "react";
import "./Switch.scss";

const Switch = ({ text, value, ...props }) => {
  const [checked, setChecked] = useState(value);
  const handleChange = (e) => {
    setChecked(e.target.checked);
    props?.onChange({
      target: {
        name: props.name,
        value: e.target.checked,
      },
    });
  };
  return (
    <div className="form-check form-switch switch">
      <p>{text}</p>
      <input
        className="form-check-input"
        type="checkbox"
        id="flexSwitchCheckDefault"
        checked={checked}
        onChange={handleChange}
      />
    </div>
  );
};

export default Switch;
