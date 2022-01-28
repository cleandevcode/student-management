import React from "react";
import Loading from "../common/loading";
import { IWikiResponse, IWikiQuery } from "../models/wiki";
import { Input, Button } from "antd";

interface IProps {}

interface IState {
  query: string;
  pages: any;
  loading: boolean;
  test: string;
}

export default class Wiki extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      query: "",
      pages: [],
      loading: false,
      test: "",
    };
    this.handleShowWiki = this.handleShowWiki.bind(this);
  }

  handleChangeQuery(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ query: event.target.value });
  }

  handleKeypress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      this.handleSearch();
    }
  }

  handleShowWiki(pageId: number) {
    const url = `${process.env.REACT_APP_WIKI_API}?action=query&origin=*&prop=info&pageids=${pageId}&inprop=url&format=json`;
    fetch(url)
      .then((res) => res.json())
      .then((res: IWikiResponse) => {
        console.log("res>>>>>>>>", res);
        if (res) {
          window.open(Object.values(res.query?.pages)[0]?.fullurl, "_blank");
        }
      });
  }

  handleSearch() {
    this.setState({ loading: true });
    const url = `${process.env.REACT_APP_WIKI_API}?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch='${this.state.query}'`;
    fetch(url)
      .then((res) => res.json())
      .then((res: IWikiResponse) => {
        if (res && Object.keys(res).length > 0) {
          this.setState({
            pages: Object.values(res.query.pages),
          });
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { query, loading, pages } = this.state;
    return (
      <div className="form-group mb-3">
        <h3>See the results of Wiki by query</h3>
        <label htmlFor="query"></label>
        <div className="field">
          <Input
            type="text"
            name="query"
            className="form-control"
            placeholder="Enter the query"
            value={query}
            onChange={this.handleChangeQuery.bind(this)}
            onKeyPress={this.handleKeypress.bind(this)}
          />
        </div>
        <div className="mt-3 text-right">
          <Button
            type="primary"
            onClick={this.handleSearch.bind(this)}
            disabled={query.length === 0}
          >
            Search
          </Button>
        </div>
        <div className="col-12 text-center mt-3">
          {loading && <Loading />}
          {!loading &&
            pages.length > 0 &&
            pages.map((item: IWikiQuery) => (
              <div key={item.pageid}>
                <p
                  className="d-flex align-items-center pointer border-bottom-1"
                  onClick={() => this.handleShowWiki(item.pageid)}
                >
                  <b>Title: </b>
                  <span style={{ marginLeft: 10 }}>{item.title}</span>
                </p>
              </div>
            ))}
          {!loading && pages.length === 0 && <p>No data with the keyword</p>}
        </div>
      </div>
    );
  }
}
