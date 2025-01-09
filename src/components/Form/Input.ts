import React from 'react'
import { getInputType } from './form.helper';
const Input = ({ attributes, ...elementProps }) => {
    const { inputType,inSearch,inForm,inResult,inApprove,onDelete,onApprove,buttonType,...otherProps } = attributes;
    const element = getInputType({ inputType });
    const clonnedComponent = React.cloneElement(
        element,
        { ...elementProps,...otherProps }
    );
    return clonnedComponent;
}

export default Input