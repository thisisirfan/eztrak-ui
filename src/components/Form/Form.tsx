import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import "./Form.scss";
import FaIcon from "../Icon/FaIcon";
import Input from "./Input";
import ValidationMessage from "./form-elements/ValidationMessage";

import {
  formatFormValue,
  getConditionalFields,
  handleChangeStrategies,
  isEmpty,
} from "./form.helper";
import { checkValidation } from "./formValidation";
import { FormData, FormProps } from "./interfaces";

const Form: React.FC<FormProps> = ({
  formData = [] as FormData[],
  onSubmit,
  withValidation,
  formValidation,
  extraInputClass,
  useDispatch,
  useSelector,
  setFormValues,
  ...otherProps
}) => {

  const dispatch = useDispatch();
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => { }, [formValidation]);

  const setForm = (val: any) => {
    dispatch(setFormValues(val));
  };
  const form = useSelector((state: any) => state.form.values);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = () => {
    const { current } = ref;
    const formIsValid = current?.reportValidity() ?? false;
    if (!formIsValid) return; //return if form is invalid

    const inputs =
      formData.length &&
      formData
        ?.filter((c) => c.inputType === "hidden")
        .reduce((acc, curr) => ({ ...acc, [curr.name]: curr.value }), {}); // hiden values in form

    let validation = {}; //custom validations
    formData?.map((i) => {
      if (i.validation) {
        validation = checkValidation(i.name, form[i.name], i.validation, i.label, form);
      }
    });
    if (!isEmpty(validation)) {
      dispatch({ type: "form/setValidations", payload: validation });
    }
    if (!withValidation || isEmpty(validation)) {
      onSubmit({ ...form, ...inputs });
    }
  };

  let updatedFormFields = getConditionalFields(formData, form);
  updatedFormFields =
    updatedFormFields.length > 0
      ? updatedFormFields.map((i) => {
        return i?.buttonType === "submit"
          ? { ...i, onClick: () => handleSubmit() }
          : i;
      })
      : [];

  const handleChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>, def: any) => {
      const { onChangeMethod } = def;
      let stretegy = "default";
      if (onChangeMethod) {
        stretegy = onChangeMethod;
      }
      const stretegyFunction = handleChangeStrategies(stretegy, form, setForm);
      stretegyFunction(evt, def);
    },
    [formData]
  );
  return (
    <form ref={ref} className="form row" autoComplete="off" {...otherProps}>
      {updatedFormFields &&
        updatedFormFields?.map(
          ({ wrapperClass, label, ...formAttributes }, index) => {
            const value = formatFormValue(
              formAttributes?.inputType,
              formAttributes.name ? form[formAttributes.name] : undefined,
              formAttributes?.inputType,
              formAttributes
            );

            const isPasswordField = formAttributes.inputType === "password" && formAttributes.showPassword;
            const type =
              isPasswordField && showPassword ? "text" : formAttributes.type;

            return (
              <React.Fragment key={index}>
                {formAttributes.inputType === "hidden" ? (
                  <Input attributes={formAttributes} />
                ) : (
                  <>
                    {!formAttributes?.hidden && (
                      <div
                        className={`field-wrapper align-center ${extraInputClass} ${wrapperClass ? wrapperClass : "col-6"
                          }`}
                      >
                        {label && (
                          <label
                            className={`text text-dark pb${withValidation ? 2 : ""}`}
                          >
                            {label}
                            {formAttributes?.validation?.required && (
                              <span className="text-danger ps-1">*</span>
                            )}
                          </label>
                        )}
                        <div
                          className={`input-wrapper ${formAttributes.className
                            ? formAttributes.className
                            : ""
                            }`}
                        >
                          {formAttributes?.icon && (
                            <div
                              className={`flex justify-center input-icon-wrapper`}
                              onClick={(e) => handleSubmit(e)}
                            >
                              <FaIcon
                                iconName={formAttributes.icon}
                                size={formAttributes?.iconSize ?? 14}
                                color={formAttributes?.iconColor ?? "#ccc"}
                              />
                            </div>
                          )}
                          <Input
                            onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                              handleChange(evt, formAttributes)
                            }
                            attributes={{
                              ...formAttributes,
                              ...((isPasswordField || formAttributes.type) && {
                                type,
                              }),
                              value,
                            }}
                          />
                          {isPasswordField && (
                            <div
                              className="flex justify-center"
                              onClick={handlePasswordToggle}
                              style={{
                                position: "absolute",
                                right: "32px",
                                top: "45%",
                                transform: "translateY(-50%)",
                                cursor: "pointer",
                              }}
                            >
                              <FaIcon
                                iconName={showPassword ? "FaEyeSlash" : "FaEye"}
                                size="16"
                                color="#ccc"
                              />
                            </div>
                          )}

                          {withValidation && formValidation && (
                            <ValidationMessage className="ihelp">
                              {formValidation[formAttributes?.name] &&
                                formValidation[formAttributes?.name]?.message}
                            </ValidationMessage>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </React.Fragment>
            );
          }
        )}
    </form>
  );
};

export default Form;
