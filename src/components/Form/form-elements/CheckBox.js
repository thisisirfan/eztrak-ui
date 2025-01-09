import React from "react";
import "./CheckBox.scss";

const CheckBox = ({ text, value, disable = false, ...props }) => {

  const [checked, setChecked] = React.useState(value);
  const handleCheckboxChange = (evt) => {
    setChecked(evt.target.checked);
    props?.onChange({
      target: { name: props.name, value: evt.target.checked },
    });
  };
  return (
    <div className={`form-check checkbox ${checked ? "checked" : ""}`}>
      <label className="form-check-label" for="flexCheckChecked">
        {text}
      </label>
      <input
        className="form-check-input"
        type="checkbox"
        id="flexCheckChecked"
        checked={checked}
        onChange={handleCheckboxChange}
      />
    </div>
  );
};
{
  /* <div className={`d-flex checkbox ${checked ? "checked" : ""}`}>
      <p className="mr-2">{text}</p>
      <input
        type="checkbox"
        checked={checked}
        disabled={disable}
        onChange={handleCheckboxChange}
        {...props}
      />
    </div> */
}

export default CheckBox;
