import React, { useEffect, useState } from "react";
import "./RadioOption.scss";
import { useDispatch, useSelector } from "react-redux";

const RadioOption = ({
  label,
  id,
  labelAttribute,
  valueAttribute,
  options = null,
  formValues, // assuming formValues is passed as a prop
  value, // props.value to fetch corresponding item
  ...props
}) => {

  let _value = parseInt(value);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    if (value && value !== selectedOption) {
      // Fetch item based on props.value
      const item = getItemFromValue(_value);
      if (item) {
        setSelectedOption(item[valueAttribute]);
      }
    }
  }, [value, selectedOption, valueAttribute]);

  const lookups = useSelector((state) => state?.form?.lookups);
  const dispatch = useDispatch();

  const getItemFromValue = (value) => {
    let item = null;
    if (Array.isArray(id)) {
      item = lookups[id.key]?.find((item) => item[valueAttribute] === value);
    } else {
      item = lookups[id]?.find((item) => item[valueAttribute] === value);
    }
    return item;
  };

  const handleOptionChange = (value) => {
    setSelectedOption(value);
    props?.onChange({
      target: {
        name: props?.name,
        value: value,
      },
    });
  };

  useEffect(() => {
    if (props?.url) {
      dispatch({
        type: "form/fetchLookup",
        payload: { key: id, url: props?.url },
      });
    }
  }, [dispatch, id, props?.url]);

  const getDefaultOptions = () => {
    if (options) {
      return options; // Use provided options if available
    } else if (Array.isArray(id)) {
      return (
        lookups[id?.key]?.map((item) => ({
          label: item[labelAttribute],
          value: item[valueAttribute],
        })) || []
      );
    } else {
      return (
        lookups[id]?.map((item) => ({
          label: item[labelAttribute],
          value: item[valueAttribute],
        })) || []
      );
    }
  };

  return (
    <div className="d-flex flex-column radio-op">
      <p className="p-0 m-0">{label}</p>
      <div className="d-flex align-items-center radio-row-container flex-wrap">
        {getDefaultOptions()?.map((item, index) => (
          <div
            key={index}
            className="d-flex align-items-center radio-container"
          >
            <input
              type="radio"
              value={item?.value}
              checked={selectedOption === item?.value}
              onChange={() => handleOptionChange(item?.value)}
            />
            <p className="m-0">{item?.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioOption;
