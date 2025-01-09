import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../table/Table";

const SelectableTableInput = ({
  id,
  name,
  label = "",
  columns = [],
  url = "",
  searchAttribute = "name",
  valueAttribute = "id",
  customStyles = {},
  onChange = {},
  onChangeMethod = {},
  ...otherProps
}) => {
  const lookups = useSelector((state) => state?.form?.lookups);
  const items = lookups[id]?.items;
  const dispatch = useDispatch();

  // const [projectBeneficiaries, setProjectBeneficiaries] = useState([])

  const handleRowSelected = useCallback(({ selectedRows }) => {
    onChange(
      {
        value: selectedRows.map((item) =>
          valueAttribute ? item[valueAttribute] : item
        ),
        label: name,
      },
      { name, onChangeMethod }
    );
  }, []);
  // const getDefaultOptions = () => {
  //   return options ? options : lookups[id]?.items.map((item) => ({ "label": item[labelAttribute], "value": item[valueAttribute] }));
  // }

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [id, url]);

  const fetchData = (value = "") => {
    dispatch({
      type: "form/fetchLookup",
      payload: { key: id, url, params: { [searchAttribute]: value } },
    });
  };

  return (
    <>
      <div className="d-flex justify-content-end">
        <input
          className="w-25"
          type={"text"}
          placeholder="Search"
          onChange={(e) => fetchData(e.target.value)}
        />
      </div>
      <div
        style={{ ...{ maxHeight: 150, overflowY: "scroll" }, ...customStyles }}
      >
        <Table
          columns={columns}
          data={items && items}
          selectableRows={true}
          onSelectedRowsChange={handleRowSelected}
          selectableRowSelected={rowSelectCritera}
        />
      </div>
    </>
  );
};

const rowSelectCritera = (row) => {
  return row.isAdded === true;
};

export default SelectableTableInput;
