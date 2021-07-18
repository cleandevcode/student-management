import * as React from "react";
import { Link } from "react-router-dom";
import AvartarImg from "../assets/cleancodedev.png";
interface IProps {}
interface IState {}

class Home extends React.Component<IProps, IState> {
  public componentDidMount() {}

  public render(): React.ReactNode {
    return (
      <div>
        <div className="px-4 py-5 my-5 text-center">
          <img
            className="d-block mx-auto mb-4"
            src={AvartarImg}
            alt=""
            width="72"
          />
          <h1 className="display-5 fw-bold">
            Member Management / See results on Wikipedia
          </h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              React & Typescript CRUD / Wikipedia Simple App
            </p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <a
                type="button"
                className="btn btn-primary btn-lg px-4 gap-3"
                href="https://github.com/cleandevcode/student-management"
                target="_blank"
                rel="noreferrer"
              >
                Go to Front-end repo
              </a>
              <a
                type="button"
                className="btn btn-primary btn-lg px-4 gap-3"
                href="https://github.com/cleandevcode/student-management-api"
                target="_blank"
                rel="noreferrer"
              >
                Go to Back-end repo
              </a>

              <Link
                to={"/home"}
                className="btn btn-outline-secondary btn-lg px-4"
              >
                Index
              </Link>
              <Link
                to={"/wiki"}
                className="btn btn-outline-secondary btn-lg px-4"
              >
                Wikipedia
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
