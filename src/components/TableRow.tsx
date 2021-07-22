import React from "react";
import { Link } from "react-router-dom";
import Person from "../models/person";
import BaseService from "../service/base.service";
import * as toastr from "toastr";
import { Button } from "antd";

function Del(Id?: string) {
  BaseService.delete("/students/", Id).then((rp) => {
    if (rp.status) {
      toastr.success("Member saved.");
      window.location.reload();
    } else {
      toastr.error(rp.message);
    }
  });
}

interface IProps {
  person: Person;
  index: Number;
}

const TableRow: React.FunctionComponent<IProps> = (props) => {
  return (
    <tr>
      <td>{props.index}</td>
      <td>{props.person.firstName}</td>
      <td>{props.person.lastName}</td>
      <td>{props.person.email}</td>
      <td>{props.person.mobileNumber}</td>
      <td>{props.person.address}</td>
      <td className="text-right">
        <Button type="primary">
          <Link to={"/edit/" + props.person.id}>Edit</Link>
        </Button>
      </td>
      <td className="text-left">
        <Button onClick={() => Del(props.person.id)} type="primary" danger>
          Delete
        </Button>
      </td>
    </tr>
  );
};
export default TableRow;
