import * as React from "react";
import { Button } from "antd";

interface Props {
  label: string;
  className: string;
  onClick: () => void;
}

export const AntButton: React.FunctionComponent<Props> = (props) => {
  return (
    <Button className={props.className} type="primary" onClick={props.onClick}>
      {props.label}
    </Button>
  );
};
