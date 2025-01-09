import React, { useEffect, useReducer } from "react";

import EditableTable from "../../editable-table/EditableTable";
import RowColConfig from "../../editable-table/RowColConfig";

const EditableInput = ({ columns = [], data = [] }) => {
    const [state, dispatch] = useReducer(RowColConfig, { columns, data });

    useEffect(() => {
        dispatch({ type: "enable_reset" });
    }, [state.data, state.columns]);

    return (
        <>
            <EditableTable columns={columns} data={data} dispatch={dispatch} />
        </>
    );
};

export default EditableInput;
