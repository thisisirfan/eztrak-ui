import React, { useEffect } from "react";
import { useState } from "react";
import FaIcon from "../../Icon/FaIcon";
import {
  isEmpty,
  handleChangeStrategies,
  getConditionalFields,
} from "../form.helper";
import Input from "../Input";
import "./TableInput.scss";
import { PlusCircle, Trash3 } from "react-bootstrap-icons";
const TableInput = ({
  name,
  defaultRows,
  header,
  onChange,
  value,
  ...otherProps
}) => {
  useEffect(() => {
    const initialRows = value ? value : [];
    if (!value?.edit && rows.length == 0) setRows(initialRows);
  }, [value]);

  const defaultForm = header.reduce((c, v) => {
    return { ...c, [v.name]: { ...v, value: "" } };
  }, {});
  const [form, setForm] = useState(defaultForm);
  const [rows, setRows] = useState([]);
  const [clearInput, setClearInput] = useState(false);
  const handleSubmitChanges = (updatedRows) => {
    setRows(updatedRows);
    onChange({ target: { name, value: updatedRows } });
  };
  const checkRequired = () => {
    const required = header
      .filter((i) => i.isRequired)
      .filter((j) => {
        return form[j.name].value == "";
      });
    if (required.length) {
      setClearInput(false);
      setForm({
        ...form,
        [required[0].name]: {
          ...required[0],
          ...form[required[0].name],
          className: `${form[required[0].name].className} danger`,
        },
      });
    }
    return !required.length;
  };
  const handleAdd = () => {
    if (checkRequired()) {
      const updatedRows = [...rows, { ...form, edit: false }];
      handleSubmitChanges(updatedRows);
      setClearInput(true);
      handleClear();
    }
  };
  const handleClear = () => {
    setForm(defaultForm);
  };
  const handleEdit = (index) => {
    const updatedRows = rows.map((i, j) => {
      if (j === index) {
        setForm(rows[j]);
      }
      return j === index ? { ...i, edit: true } : { ...i, edit: false };
    });
    setRows([...updatedRows]);
    setClearInput(true);
  };

  const handleEditComplete = (index) => {
    if (checkRequired()) {
      const updatedRows = rows.map((row, j) => {
        return j === index ? { ...form, edit: false } : { ...row, edit: false };
      });
      handleSubmitChanges(updatedRows);
      setClearInput(true);
      handleClear();
    }
  };
  const handleHeaderChange = (evt, def) => {
    setClearInput(false);
    handleChange(evt, def);
  };
  const handleChange = (evt, def) => {
    let stretegy = "default"; //stretegy = "tableInput";
    if (def && def["onChangeMethod"]) {
      stretegy = def["onChangeMethod"];
    }
    handleChangeStrategies(stretegy, form, setForm)(evt, def);
  };

  const handleDelete = (index) => {
    let up = rows.filter((i, j) => j != index && !isEmpty(i));
    handleSubmitChanges(up);
  };

  // let parentForm = {};
  const formatedFields = getConditionalFields(header, form);

  return (
    <div className="tb-input">
      <table className="tableInput">
        <thead>
          <tr>
            {formatedFields.map((data, index) => {
              return <th key={index}>{data.label}</th>;
            })}
            <th className="text-center">
              <span>
                {/* <FaIcon iconName="FaCog" color="#075f33" /> */}
                Action
              </span>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            {formatedFields.map((col, index) => {
              let columnData = col;

              if (!clearInput) {
                columnData = { ...columnData, ...form[col.name] };
              } else {
                columnData = { ...columnData, value: "" };
              }
              return (
                <td key={index} className={`input-wrap`}>
                  <Input
                    attributes={{ ...columnData }}
                    // name={col.name}
                    onChange={(evt) => handleHeaderChange(evt, col)}
                  />
                </td>
              );
            })}
            <td className="text-center">
              <button
                className="add-more-btn"
                type="button"
                onClick={() => handleAdd()}
              >
                <PlusCircle color="#075f33" size={16} />
                Add
              </button>
            </td>
          </tr>
          {rows.map((row, j) => {
            return (
              <tr key={j}>
                {Object.values(row).map((col, index) => {
                  return row.edit && typeof col != "boolean" ? (
                    <td key={index} className="input-wrap">
                      <Input
                        attributes={{ ...col, ...form[col.name] }}
                        // defaultValue={col && col}
                        // name={col && col.name}
                        onChange={(evt) => handleChange(evt, col)}
                      />
                    </td>
                  ) : (
                    <td
                      className={
                        row.edit || typeof col == "boolean" ? "act-wrap" : ""
                      }
                      key={index}
                    >
                      {row.edit ? (
                        <div className="act">
                          <button
                            type="button"
                            onClick={() => handleEditComplete(j)}
                          >
                            <FaIcon iconName={"FaCheck"} color="" />
                          </button>
                        </div>
                      ) : (
                        <div className="act">
                          {typeof col == "boolean" ? (
                            <>
                              <button
                                type="button"
                                onClick={() => handleEdit(j)}
                              >
                                <FaIcon iconName={"FaEdit"} color="#075f33" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(j)}
                              >
                                <Trash3 />
                              </button>
                            </>
                          ) : (
                            <>{col?.label}</>
                          )}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        {/* <td className="text-center p-2" colSpan={formatedFields.length + 1}>
          <button
            className="add-more-btn"
            type="button"
            onClick={() => handleAdd()}
          >
            <PlusCircle color="#075f33" size={16} />
            Add {rows && rows.length > 0 ? 'More' : 'Data'}
          </button>
        </td> */}
      </table>
    </div>
  );
};

export default TableInput;
