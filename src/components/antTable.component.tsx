import { Table, Space, Button } from "antd";
import { Link } from "react-router-dom";
import BaseService from "../service/base.service";
import * as toastr from "toastr";

const AntTable: React.FunctionComponent<any> = ({ data, loading }) => {
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      sorter: (a: any, b: any) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      sorter: (a: any, b: any) => a.lastName.localeCompare(b.lastName),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a: any, b: any) => a.email.localeCompare(b.email),
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      sorter: (a: any, b: any) => a.mobileNumber.localeCompare(b.mobileNumber),
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: (a: any, b: any) => a.address.localeCompare(b.address),
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <Button type="primary">
            <Link to={"/edit/" + record.id}>Edit</Link>
          </Button>
          <Button onClick={() => Del(record.id)} type="primary" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const Del = (id: string) => {
    BaseService.delete("/students/", id).then((rp) => {
      if (rp.status) {
        toastr.success("Member saved.");
        window.location.reload();
      } else {
        toastr.error(rp.message);
      }
    });
  };

  return <Table columns={columns} dataSource={data} loading={loading} />;
};

export default AntTable;
