import React from "react";
import { Link } from "react-router-dom";
import Person from "../models/person";
import BaseService from "../service/base.service";
import * as toastr from "toastr";

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
        <Link to={"/edit/" + props.person.id} className="btn btn-primary">
          Edit
        </Link>
      </td>
      <td className="text-left">
        <button onClick={() => Del(props.person.id)} className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  );
};
export default TableRow;
