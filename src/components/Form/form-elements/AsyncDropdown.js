import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncSelect from "react-select/async";

const AsyncDropdown = ({
  id,
  url,
  labelAttribute = "name",
  valueAttribute = "id",
  searchAttrib = "name",
  options = null,
  value = [],
  ...otherProps
}) => {
  let _value = [];
  if (!otherProps?.isMulti && !otherProps?.isEnum) {
    _value =
      value?.id && value?.name
        ? { value: value?.id, label: value?.name }
        : value;
  } else if (otherProps?.isEnum) {
    if (value) {
      _value = {
        value: value?.value ? { ...value } : value,
        label: value?.label ? value?.label : value,
      };
    }
  } else _value = value && Array.isArray(value) && value;

  const dispatch = useDispatch();
  let results = [];
  const lookups = useSelector((state) => state?.form?.lookups);
  const [currentValue, setCurrentValue] = useState(null);

  useEffect(() => {
    if (url) {
      dispatch({
        type: "form/fetchLookup",
        payload: { key: id, url },
      });
      getDefaultOptions();
    }
  }, [url]);

  const getDefaultOptions = () => {

    return options
      ? options
      : typeof id === "object"
        ? lookups[id?.key]?.map((item) => ({
          label: item[labelAttribute],
          value: item[valueAttribute],
        }))
        : lookups[id]?.map((item) => ({
          label: item[labelAttribute],
          value: item[valueAttribute],
        }));
  };

  const loadOptions = (inputValue, callback) => {
    // perform a request
    if (url) {
      fetchData(inputValue);
    }
    if (lookups && id && lookups[id]) {
      results = lookups[id]?.map((item) => ({
        label: item[labelAttribute],
        value: item[valueAttribute],
      }));
    }
    if (!url && inputValue) {
      results = getDefaultOptions().filter((i) =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
      );
    }
    callback(results);
  };

  const fetchData = (inputValue = "") => {
    const conditionalOperator = url.includes("?") ? "&" : "?";
    const requestUrl = searchAttrib
      ? `${url}${conditionalOperator}${searchAttrib}=${inputValue}&DisablePagination=true`
      : `${url}?DisablePagination=true`;
    dispatch({
      type: "form/fetchLookup",
      payload: { q: inputValue, key: id, url: requestUrl },
    });
  };

  let selectRef = null;

  const clearValue = () => {
    selectRef.clearValue();
  };

  useEffect(() => {
    if (currentValue == "" && url) fetchData();
  }, [currentValue]);

  return (
    <>
      <AsyncSelect
        onInputChange={(inputValue) => setCurrentValue(inputValue)}
        ref={(ref) => {
          selectRef = ref;
        }}
        className="dropdown-input"
        defaultOptions={getDefaultOptions()}
        loadOptions={loadOptions}
        {...otherProps}
        value={_value}
        noOptionsMessage={({ inputValue }) =>
          !inputValue ? `Search` : "No results found"
        }
        // menuIsOpen={true}
      />
      {/* <i onClick={()=>clearValue()}>clear</i> */}
    </>
  );
};

export default AsyncDropdown;
