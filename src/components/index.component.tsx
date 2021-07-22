import * as React from "react";
import TableRow from "./TableRow";
import Person from "../models/person";
import BaseService from "../service/base.service";
import * as toastr from "toastr";
import Loading from "../common/loading";
import { Input } from "antd";
import AntTable from "./antTable.component";

interface IProps {}
interface IState {
  listPersons: Array<Person>;
  filteredPersons: Array<Person>;
  isReady: Boolean;
  hasError: Boolean;
  sorted: Boolean;
  searchKey: string;
  loading: Boolean;
}

class Index extends React.Component<IProps, IState> {
  public state: IState = {
    listPersons: new Array<Person>(),
    filteredPersons: new Array<Person>(),
    isReady: false,
    hasError: false,
    sorted: false,
    searchKey: "",
    loading: false,
  };
  constructor(props: IProps) {
    super(props);
    this.state = {
      isReady: false,
      listPersons: Array<Person>(),
      filteredPersons: new Array<Person>(),
      hasError: false,
      sorted: false,
      searchKey: "",
      loading: false,
    };
    this.onSorting = this.onSorting.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  public componentDidMount() {
    this.loadData();
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

  componentWillMount() {
    this.loadData();
  }

  loadData() {
    this.setState({ loading: true });
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

        this.setState(
          {
            listPersons: listPersons,
          },
          () => {
            this.search(this.state.searchKey);
          }
        );
        this.setState({ isReady: true, loading: false });
      } else {
        this.setState({ isReady: true });
        this.setState({ hasError: true, loading: false });
        console.log("Messages: " + rp.message);
      }
    });
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

    return this.state.filteredPersons.map(function (object, i) {
      return <TableRow key={i} index={i + 1} person={object} />;
    });
  };

  onSorting(keyword: string, sorted: Boolean) {
    const { filteredPersons } = this.state;

    switch (keyword) {
      case keyword:
        const result = filteredPersons.sort((a: any, b: any) => {
          return sorted
            ? a[keyword].localeCompare(b[keyword])
            : b[keyword].localeCompare(a[keyword]);
        });
        this.setState({
          ...this.state,
          filteredPersons: result,
          sorted: !sorted,
        });
        return;
      default:
        break;
    }
  }

  search = (term: string) => {
    let originalLists = this.state.listPersons;
    const results = originalLists.filter((user: any) =>
      Object.keys(user).some((key) =>
        user[key]
          .toString()
          .toLowerCase()
          .includes(term.toString().toLowerCase())
      )
    );
    this.setState({ ...this.state, filteredPersons: results });
  };

  handleChange(event: any) {
    console.log("test>>>>", event.target.value);
    this.setState({ searchKey: event.target.value }, () => {
      this.search(this.state.searchKey);
    });
  }

  public render(): React.ReactNode {
    const { searchKey } = this.state;
    return (
      <div>
        <div className="d-flex flex-end">
          <Input
            type="text"
            className="form-control mb-3"
            value={searchKey}
            onChange={this.handleChange}
            placeholder="Enter the search key.."
          />
        </div>
        <h3 className="text-center">Persons List</h3>
        <AntTable data={this.state.listPersons} loading={this.state.loading} />
      </div>
    );
  }
}
export default Index;
