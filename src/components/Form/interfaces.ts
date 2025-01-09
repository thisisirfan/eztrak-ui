export interface InputTypeProps {
  inputType: string;
}

export interface ValidationRules {
  min?: number;
  max?: number;
  required?: boolean;
  isEmail?: boolean;
  isNumber?: boolean;
  isEndDate?: boolean;
  compareWith?: string;
  mustMatch?: string;
}

export interface Values {
  [key: string]: any;
}

export interface ValidationResult {
  [key: string]: { message: string };
}

export type HandleChangeStrategy = (
  evt: any,
  def: any
) => void;

export interface HandleChangeStrategies {
  [key: string]: HandleChangeStrategy;
}

export interface FormatFormValue {
  (entry: any): any;
}

export interface Format {
  [key: string]: FormatFormValue;
}

export interface Field {
  buttonType: string;
  condition?: Condition;
  conditions?: Condition[];
  inputType?: string;
  url?: string;
  name?: string;
  validation?: ValidationRules;
  label?: string;
  hidden?: boolean;
}

export interface Condition {
  action: string;
  fieldName: string;
  matchValue: any;
  paramField?: string;
  hideOnLabel?: boolean;
}

export interface FormData {
  name: string;
  inputType?: string;
  value?: any;
  validation?: any;
  buttonType?: string | undefined;
  wrapperClass?: string;
  label?: string;
  className?: string;
  [key: string]: any;
}

export interface FormProps {
  formData?: FormData[];
  onSubmit: (data: any) => void;
  withValidation?: boolean;
  formValidation?: any;
  extraInputClass?: string;
  useDispatch: () => any;
  useSelector: (state: any) => any;
  setFormValues: (val: any) => void;
  [key: string]: any;
}

export interface Dispatch {
  (action: { type: string; payload: any }): void;
}