import React from "react";
import * as toastr from "toastr";
import Person from "../models/person";
import BaseService from "../service/base.service";
import { History } from "history";
import { PersonPage } from "./page.form";

interface IProps {
  history: History;
  //Map properties match
  match: {
    isExact: boolean;
    params: {
      id: string;
    };
    path: string;
    url: string;
  };
}
interface IState {
  person: Person;
}

export default class Edit extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      person: {
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        address: "",
      },
    };
    this.onFieldValueChange = this.onFieldValueChange.bind(this);
  }

  private onFieldValueChange(fieldName: string, value: string) {
    const nextState = {
      ...this.state,
      person: {
        ...this.state.person,
        [fieldName]: value,
      },
    };

    this.setState(nextState);
  }

  public componentDidMount() {
    BaseService.get<Person>("/students/", this.props.match.params.id).then(
      (rp) => {
        console.log(">>>>RP>>", rp);
        if (rp.status) {
          const person = rp.data;
          this.setState({
            person: new Person(
              person.id,
              person.firstName,
              person.lastName,
              person.email,
              person.mobileNumber,
              person.address
            ),
          });
        } else {
          toastr.error(rp.message);
        }
      }
    );
  }

  private onSave = () => {
    console.log(this.state.person);
    BaseService.update<Person>(
      "/students/",
      this.props.match.params.id,
      this.state.person
    ).then((rp) => {
      if (rp.status) {
        toastr.success("Member saved.");
        this.props.history.goBack();
      } else {
        toastr.error(rp.message);
      }
    });
  };

  render() {
    return (
      <PersonPage
        person={this.state.person}
        onChange={this.onFieldValueChange}
        onSave={this.onSave}
      />
    );
  }
}
