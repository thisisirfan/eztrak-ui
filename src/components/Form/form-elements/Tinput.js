import React, { useState } from "react";

const Tinput = () => {
  const [form, setForm] = useState({});
  const [rows, setRows] = useState([]);
  const handleChange = ({ name, value }) => {
    setForm({ ...form, [name]: { name, value } });
  };
  const handleAdd = () => {
    setRows([...rows, form]);
  };
  return (
    <div>
      <div className="flex">
        <div>
          <input name="one" onChange={(evt) => handleChange(evt.target)} />
        </div>
        <div>
          <input name="two" onChange={(evt) => handleChange(evt.target)} />
        </div>
        <div>
          <input name="three" onChange={(evt) => handleChange(evt.target)} />
        </div>
        <div>
          <button onClick={() => handleAdd()}>Add</button>
        </div>
      </div>
      <table className="w100">
        <tbody>
          {rows.map((i, j) => {
            return (
              <tr key={j}>
                {Object.values(i).map((col, ind) => {
                  const { value } = col;
                  return <td key={`r${j}c${ind}`}>{value}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Tinput;
