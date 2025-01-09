import React from "react";
import AsyncDropdown from "./form-elements/AsyncDropdown";
import Button from "./form-elements/Button";
import Dropdown from "./form-elements/Dropdown";
import SelectableTableInput from "./form-elements/SelectableTableInput";
import TableInput from "./form-elements/TableInput";
import Upload from "./form-elements/Upload";
import DateInput from "./form-elements/DateInput";
import UploadImages from "./form-elements/UploadImages";
import MultiInput from "./form-elements/MultiInput";
import UploadMultiFiles from "./form-elements/UploadMultiFiles";
import CheckBox from "./form-elements/CheckBox";
import Switch from "./form-elements/Switch";
import RadioOption from "./form-elements/RadioOption";

import {
  InputTypeProps,
  Values,
  HandleChangeStrategy,
  HandleChangeStrategies,
  Format,
  Field,
  Condition,
} from "./interfaces";

type InputType = {
  [key: string]: JSX.Element
};

export const inputTypes: InputType = {
  text: <input />,
  textarea: <textarea></textarea>,
  h1: <h1></h1>,
  h2: <h2></h2>,
  h3: <h3></h3>,
  h4: <h4></h4>,
  h5: <h5></h5>,
  p: <p></p>,
  file: <Upload />,
  checkbox: <CheckBox />,
  switch: <Switch />,
  radioOption: <RadioOption />,
  multiFiles: <UploadMultiFiles />,
  date: <DateInput />,
  button: <Button type="button" />,
  hidden: <input type="hidden"></input>,
  submit: <button></button>,
  dropdown: <Dropdown />,
  tableInput: <TableInput />,
  SelectableTable: <SelectableTableInput />,
  "async-dropdown": <AsyncDropdown />,
  image: <UploadImages />,
  multiInput: <MultiInput />,
};

export const getInputType = ({ inputType }: InputTypeProps): JSX.Element => {
  const output = inputTypes[inputType] ? inputTypes[inputType] : <input />;
  return output;
};

export const getFormatedDate = (date: string = ""): string => {
  return new Date(date)?.toLocaleDateString();
};

export const isEmpty = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};

export const handleChangeStrategies = (
  key: string = "default",
  state: any,
  setState: (state: any) => void
): HandleChangeStrategy => {
  const strategies: HandleChangeStrategies = {
    default: (evt) => {
      const { name, value } = evt.target;
      setState({ ...state, [name]: { name, value } });
    },
    dropdown: (evt, def) => {
      const { name, isMulti = false } = def;
      setState({
        ...state,
        [name]: isMulti
          ? { name: name, value: evt }
          : { name: name, value: evt?.value },
      });
    },
    asyncdropdown: (evt, def) => {
      const { value, label } = evt;
      const { name, isMulti, isEnum = false } = def;
      setState({
        ...state,
        [name]: isMulti
          ? { name, value: evt }
          : { name, value: { label, value }, isEnum },
      });
    },
    "text-in-table": (evt, def) => {
      const { name, value } = evt.target;
      setState({
        ...state,
        [name]: { ...def, label: value, name, value },
      });
    },
    "dropdown-in-table": (evt, def) => {
      const { value, label } = evt;
      const { name } = def;
      setState({
        ...state,
        [name]: {
          ...def,
          label,
          value: { value, label },
        },
      });
    },
    onTableSelection: (evt, def) => {
      const { value } = evt;
      const { name } = def;
      setState({
        ...state,
        [name]: { name, value: { name, value } },
      });
    },
    onFileChange: (evt) => {
      const { name, value } = evt?.target;
      setState({ ...state, [name]: value });
    },
    onFileChangeTable: (evt, def) => {
      const { name, value, label } = evt?.target;
      setState({ ...state, [name]: { ...def, name, value, label: value } });
    },
    onMultiFileChange: (evt) => {
      const { name, value, isDeleted = false, updatedFiles = [] } = evt.target;
      if (isDeleted) {
        setState({ ...state, [name]: { value: updatedFiles } });
      } else {
        setState({
          ...state,
          [name]: {
            value: state?.[name]
              ? [...state[name]?.value, ...evt.target.files]
              : [...evt.target.files],
          },
        });
      }
    },
  };
  return strategies[key];
};

export const formatFormValue = (
  type: string = "default",
  entry: any,
  inputType: string = "text",
  field: any
): any => {
  const format: Format = {
    default: (entry) => {
      if (typeof entry == "object") {
        if (
          inputType === "tableInput" ||
          inputType === "progressDetailtableInput"
        ) {
          const tableValues = entry?.value;
          const tableColumns = field?.header;
          const modifiedTable = tableValues?.map((tableValue: any) => {
            if (tableValue?.id) {
              let tableRow: any = {};
              tableColumns.forEach((column: any) => {
                const columnValue = tableValue[column?.name];
                const columnLabel =
                  typeof columnValue == "object"
                    ? columnValue?.name
                    : columnValue;
                tableRow = {
                  ...tableRow,
                  [column?.name]: {
                    ...column,
                    value: columnValue,
                    label: columnLabel,
                  },
                };
              });
              return { ...tableRow, edit: false };
            }
            return { ...tableValue };
          });
          return modifiedTable;
        }
        if (Array.isArray(entry)) return entry;
        else return entry.value;
      }
      return entry;
    },
    date: (entry) => {
      return getFormatedDate(entry.value).split("/").reverse().join("-");
    },
    tableInput: (entry) => {
      return { ...entry, type: "tableInput" };
    },
    progressDetailtableInput: (entry) => {
      return { ...entry, type: "progressDetailtableInput" };
    },
  };
  if (entry === undefined) return "";
  const typeFunc = format[type];

  if (typeof typeFunc === "function") {
    return typeFunc(entry);
  }
  if (inputType === "tableInput") {
    return entry;
  }
  if (inputType === "progressDetailtableInput") {
    return entry;
  }
  if (inputType === "async-dropdown") {
    return { ...entry };
  }
  return format.default(entry);
};

export const getConditionalFields = (fields: FormData[], values: Values): Field[] => {
  const implementFieldAction = (
    field: Field,
    condition: Condition,
    parentFieldValue: any,
    parentFieldName: string
  ): Field => {
    if (condition?.action === "hide") {
      parentFieldValue =
        typeof parentFieldValue !== "undefined"
          ? parentFieldValue
          : getDefaultValue(fields, parentFieldName, "defaultIsChecked");

      if (condition?.hideOnLabel) {
        if (parentFieldValue?.value?.label === condition?.matchValue) {
          return { ...field, condition, hidden: true };
        }
      }

      if (
        parentFieldValue?.name === condition?.fieldName &&
        parentFieldValue?.value === condition?.matchValue
      ) {
        return { ...field, condition, hidden: true };
      }

      if (parentFieldValue?.value?.value === condition?.matchValue) {
        return { ...field, condition, hidden: true };
      }
    } else if (condition?.action === "useValue") {
      if (field?.inputType === "async-dropdown") {
        const ddParentFieldObject = values[parentFieldName]?.value;
        let ddParentFieldValue = ddParentFieldObject?.value
          ? ddParentFieldObject?.value
          : ddParentFieldObject?.id;
        const conditionalOperator = field?.url?.includes("?") ? "&" : "?";
        const params = ddParentFieldValue
          ? `${conditionalOperator}${condition?.paramField}=${ddParentFieldValue}`
          : "";
        return {
          ...field,
          url: `${field?.url}${params}`,
        };
      }
      return field;
    }
    return field;
  };

  return fields?.map((field) => {
    if (field.condition) {
      const parentFieldName = field.condition.fieldName;
      const parentFieldValue = values[parentFieldName];
      field = implementFieldAction(
        field,
        field.condition,
        parentFieldValue,
        parentFieldName
      );
    }

    if (field.conditions && Array.isArray(field.conditions)) {
      field.conditions.forEach((condition) => {
        const parentFieldName = condition.fieldName;
        const parentFieldValue = values[parentFieldName];
        field = implementFieldAction(
          field,
          condition,
          parentFieldValue,
          parentFieldName
        );
      });
    }

    return field;
  });
};

function getDefaultValue(fields: Field[], name: string, key: string): any {
  const searchedField: any = fields.find((field) => field.name === name);
  if (searchedField) return searchedField[key];
}