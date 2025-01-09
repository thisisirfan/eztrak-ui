
import { ValidationRules, Form, ValidationResult, Field, Dispatch } from "./interfaces";
import { getConditionalFields, isEmpty } from "./form.helper";

export const checkValidation = (
    key: string,
    { value }: { value?: string } = {},
    rules: ValidationRules,
    label = "",
    form: Form
): ValidationResult | {} => {
    const {
        min,
        max,
        required,
        isEmail,
        isNumber,
        isEndDate,
        compareWith,
        mustMatch,
    } = rules;
    let message = "";
    if (value && max && value.length > max) {
        message = `Value too long. max(${max})`;
    }
    if (value && min && value.length < min) {
        message = `Value too short. min(${min})`;
    }
    if (required && !value) {
        message = `${label} is required`;
    }
    if (isEmail && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        message = `${label} must be a valid email address`;
    }
    if (isNumber && value && !/^\d+$/.test(value)) {
        message = `${label} must be all numbers`;
    }
    if (isEndDate && compareWith) {
        const startDate = new Date(form[compareWith]?.value);
        const endDate = value ? new Date(value) : new Date();

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            message = `Both ${label} and Start Date must be valid dates`;
        } else if (endDate < startDate) {
            message = `${label} must be greater than Start Date`;
        }
    }
    if (mustMatch && value !== form[mustMatch]?.value) {
        message = `${label} must match ${mustMatch}`;
    }
    if (!message) return {};
    return { [key]: { message } };
};

export const validateForm = (
    formData: Field[],
    form: Form,
    dispatch: Dispatch
): boolean => {
    let newFormData = getConditionalFields(formData, form);
    let validation: ValidationResult = {}; // custom validations
    newFormData?.map((i: any) => {
        if (i.validation && !i?.hidden) {
            let validationRes = checkValidation(
                i.name,
                typeof form[i.name] !== "object" && typeof form[i.name] !== "undefined"
                    ? { value: form[i.name] }
                    : form[i.name],
                i.validation,
                i.label,
                form
            );
            validation = { ...validation, ...validationRes };
        }
    });
    if (!isEmpty(validation)) {
        const notify = ({
            // type = "error",
            message = "",
        } = {}) => {
            alert(message);
        };

        let message = Object.values(validation)
            .map((v) => v.message)
            .join("\n");
        notify({ message });
        dispatch({ type: "form/setValidations", payload: validation });
    }
    return Object.keys(validation).length == 0;
};