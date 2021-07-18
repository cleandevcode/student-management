import * as React from "react";
import TableRow from "./TableRow";
import Person from "../models/person";
import BaseService from "../service/base.service";
import * as toastr from "toastr";
import Loading from "../common/loading";
import SortIcon from "../assets/sort-icon.png";

interface IProps {}
interface IState {
  listPersons: Array<Person>;
  isReady: Boolean;
  hasError: Boolean;
  sorted: Boolean;
}

class Index extends React.Component<IProps, IState> {
  public state: IState = {
    listPersons: new Array<Person>(),
    isReady: false,
    hasError: false,
    sorted: false,
  };
  constructor(props: IProps) {
    super(props);
    this.state = {
      isReady: false,
      listPersons: Array<Person>(),
      hasError: false,
      sorted: false,
    };
    this.onSorting = this.onSorting.bind(this);
  }

  public componentDidMount() {
    BaseService.getAll<Person>("/students").then((rp) => {
      if (rp.status) {
        const data = rp.data;
        const listPersons = new Array<Person>();

        (data || []).forEach((p: any) => {
          listPersons.push(
            new Person(
              p.id,
              p.firstName,
              p.lastName,
              p.email,
              p.mobileNumber,
              p.address
            )
          );
        });

        this.setState({ listPersons: listPersons });
        this.setState({ isReady: true });
      } else {
        this.setState({ isReady: true });
        this.setState({ hasError: true });
        console.log("Messages: " + rp.message);
      }
    });

    setTimeout(() => {
      if (!this.state.isReady) {
        toastr.info(
          "It is possible that the service is being restarted, please wait more ...",
          "",
          { timeOut: 8000 }
        );
      }

      if (this.state.hasError) {
        toastr.error("An error occurred!", "", { timeOut: 8000 });
      }
    }, 2000);
  }

  public tabRow = () => {
    if (!this.state.isReady) {
      return (
        <tr>
          <td colSpan={12} className="text-center">
            <Loading />
          </td>
        </tr>
      );
    }
    if (this.state.hasError) {
      return (
        <tr>
          <td colSpan={12} className="text-center">
            <div className="alert alert-danger" role="alert">
              An error occurred!
            </div>
          </td>
        </tr>
      );
    }

    if (this.state.listPersons && this.state.listPersons.length === 0) {
      return (
        <tr>
          <td colSpan={12} className="text-center">
            <div className="alert alert-notification" role="alert">
              No Person
            </div>
          </td>
        </tr>
      );
    }

    return this.state.listPersons.map(function (object, i) {
      return <TableRow key={i} index={i + 1} person={object} />;
    });
  };

  onSorting(keyword: string, sorted: Boolean) {
    const { listPersons } = this.state;

    switch (keyword) {
      case keyword:
        const result = listPersons.sort((a: any, b: any) => {
          return sorted
            ? a[keyword].localeCompare(b[keyword])
            : b[keyword].localeCompare(a[keyword]);
        });
        this.setState({ ...this.state, listPersons: result, sorted: !sorted });
        return;
      default:
        break;
    }
  }

  public render(): React.ReactNode {
    const { sorted } = this.state;
    return (
      <div>
        <h3 className="text-center">Persons List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Index</th>
              <th
                className="pointer"
                onClick={() => this.onSorting("firstName", sorted)}
              >
                First Name
                <img src={SortIcon} alt="First name" width={12} />
              </th>
              <th
                className="pointer"
                onClick={() => this.onSorting("lastName", sorted)}
              >
                Last Name
                <img src={SortIcon} alt="First name" width={12} />
              </th>
              <th
                className="pointer"
                onClick={() => this.onSorting("email", sorted)}
              >
                Email
                <img src={SortIcon} alt="First name" width={12} />
              </th>
              <th
                className="pointer"
                onClick={() => this.onSorting("mobileNumber", sorted)}
              >
                Mobile Number
                <img src={SortIcon} alt="First name" width={12} />
              </th>
              <th
                className="pointer"
                onClick={() => this.onSorting("address", sorted)}
              >
                Address
                <img src={SortIcon} alt="First name" width={12} />
              </th>

              <th className="text-center" colSpan={2}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>{this.tabRow()}</tbody>
        </table>
      </div>
    );
  }
}
export default Index;
