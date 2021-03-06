import * as React from "react";
import Person from "../models/person";

import { Input, Button } from "../common/components/form";

interface Props {
  person: Person;
  onChange: (fieldName: string, value: string) => void;
  onSave: () => void;
}

export const PersonForm: React.FunctionComponent<Props> = (props) => {
  const [submitted, setSubmitted] = React.useState(false);

  const handleSave = () => {
    if (!submitted) {
      setSubmitted(true);
    }
    props.onSave();
  };

  return (
    <form>
      <h1>Manage member</h1>

      <Input
        name="firstName"
        label="First Name"
        value={props.person.firstName}
        onChange={props.onChange}
        submitted={submitted}
      />

      <Input
        name="lastName"
        label="Last Name"
        value={props.person.lastName}
        onChange={props.onChange}
        submitted={submitted}
      />

      <Input
        name="email"
        label="Email"
        value={props.person.email}
        onChange={props.onChange}
        submitted={submitted}
      />

      <Input
        name="mobileNumber"
        label="Mobile Number"
        value={props.person.mobileNumber}
        onChange={props.onChange}
        submitted={submitted}
      />

      <Input
        name="address"
        label="Address"
        value={props.person.address}
        onChange={props.onChange}
        submitted={submitted}
      />

      {/* <AddressInput
        name="address"
        label="Address"
        value={props.person.address}
        onChange={props.onChange}
        submitted={submitted}
      /> */}

      <Button
        label="Save"
        className="btn btn-success mt-2"
        onClick={handleSave}
      />
    </form>
  );
};
