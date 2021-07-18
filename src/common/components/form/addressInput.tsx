import * as React from "react";
import AutoComplete from "react-google-autocomplete";

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (fieldName: string, value: string) => void;
  error?: string;
  submitted: boolean;
}

export const AddressInput: React.FunctionComponent<Props> = (props) => {
  return (
    <div className={formatWrapperClass(props)}>
      <label htmlFor={props.name}>{props.label}</label>
      <div className="field">
        <AutoComplete
          apiKey="AIzaSyAuXC0Q3HAB6K12PHo3t7NjGbDAm6Bmuio"
          onPlaceSelected={(place: any) => onChangeInput(place)}
          className="form-control"
        />
        {/* <input
          type="text"
          name={props.name}
          className="form-control"
          placeholder={props.placeholder}
          value={props.value}
          onChange={onChangeInput(props)}
        /> */}
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

const onChangeInput = (place: any) => {
  console.log("place>>>>>", place);
  // props.onChange("address", e.target.value);
};
