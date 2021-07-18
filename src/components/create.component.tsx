import React from "react";
import * as toastr from "toastr";
import Person from "../models/person";
import BaseService from "../service/base.service";
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

export default class Create extends React.Component<IProps, IState> {
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

  private objectIsEmpty(obj: any) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) if (obj[key].length === 0) return true;
    }
    return false;
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
  private onSave = () => {
    console.log(this.objectIsEmpty(this.state.person));
    if (this.objectIsEmpty(this.state.person)) {
    } else {
      BaseService.create<Person>("/students", this.state.person).then((rp) => {
        if (rp.status) {
          toastr.success("Member saved.");
          window.location.href = "/home";
        } else {
          toastr.error(rp.message);
        }
      });
    }
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
