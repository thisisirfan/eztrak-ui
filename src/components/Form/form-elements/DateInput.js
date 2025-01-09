import React from "react";
import { formateDateTime } from "../../../utils/util";

const DateInput = ({ value, ...props }) => {

    const defaultValue = value ? formateDateTime(value) : '';    
    return (
        <>
            <input {...props} value={defaultValue} type="date" />
        </>
    );
};

export default DateInput;
