import React from "react";
import "./style.scss";
import SortIcon from "../../assets/sort-icon.png";
import Students from "../../models/student";

interface IProps {
    onSortChange: any;
    updateRow: any;
    deleteRow: any;
    students: Students[];
}

const DataTable: React.FunctionComponent<IProps> = (props) => {

  const handleViewCourse = (student: Students) => {
    window.location.href = `/student/${student.id}`;
  };

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th
              onClick={() => {
                props.onSortChange("firstName");
              }}
            >
              <span className="column-sort">
                First Name
                <img src={SortIcon} alt="First Name" />
              </span>
            </th>
            <th
              onClick={() => {
                props.onSortChange("lastName");
              }}
            >
              <span className="column-sort">
                Last Name
                <img src={SortIcon} alt="Last Name" />
              </span>
            </th>
            <th
              onClick={() => {
                props.onSortChange("email");
              }}
            >
              <span className="column-sort">
                E-Mail
                <img src={SortIcon} alt="E-Mail" />
              </span>
            </th>
            <th
              onClick={() => {
                props.onSortChange("mobileNumber");
              }}
            >
              <span className="column-sort">
                Mobile Number
                <img src={SortIcon} alt="Last Name" />
              </span>
            </th>
            <th>
              <span className="column-sort">Password</span>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.students.length ? (
            props.students.map((student) => (
              <tr key={student.id}>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.email}</td>
                <td>{student.mobileNumber}</td>
                <td>**********</td>
                <td className="field-actions">
                  <button
                    className="primary-btn"
                    onClick={() => {
                      props.updateRow(student);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="field-actions__delete"
                    onClick={() => props.deleteRow(student)}
                  >
                    Delete
                  </button>
                  {/* <button
                    className="field-actions__delete"
                    onClick={() => handleViewCourse(student)}
                  >
                    View Course
                  </button> */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>
                <div className="no-record-message">No Record!</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
