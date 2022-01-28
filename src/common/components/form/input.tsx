import * as React from "react";
import { Input } from "antd";

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (fieldName: string, value: string) => void;
  error?: string;
  submitted: boolean;
}

export const CustomInput: React.FunctionComponent<Props> = (props) => {
  return (
    <div className={formatWrapperClass(props)}>
      <label htmlFor={props.name}>{props.label}</label>
      <div className="field">
        <Input
          type="text"
          name={props.name}
          className="form-control"
          placeholder={props.placeholder}
          value={props.value}
          onChange={onChangeInput(props)}
        />
      </div>
      {props.submitted && (!props.value || props.value.length === 0) && (
        <div className="help-block">{props.label} is required</div>
      )}
    </div>
  );
};

const formatWrapperClass = (props: Props) => {
  const wrapperClass = "form-group mb-3";

  return props.error ? `${wrapperClass} has-error` : wrapperClass;
};

const onChangeInput =
  (props: Props) => (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.name, e.target.value);
  };
