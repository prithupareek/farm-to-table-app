import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const emitter = require("../../../../util/emitter.js");

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      showCancel: false,
    };

    this.search = () => {
      emitter.emit("search submit", this.state.query);
      this.setState({ query: this.state.query, showCancel: true });
      console.log(this.state);
    };

    this.clearSearch = () => {
      this.state.query = "";
      this.state.showCancel = false;
      this.setState({ query: "", showCancel: false });
      this.refs["search"].value = "";
      emitter.emit("search submit", this.state.query);
      console.log(this.state);
    };
  }

  render() {
    return (
      <>
        <Form>
          <Form.Row>
            <Col>
              <Form.Control
                placeholder=""
                ref="search"
                onChange={(event) => {
                  this.state.query = event.target.value;
                }}
              />
            </Col>
            <Col xs="auto">
              <Button type="button" className="mb-2" onClick={this.search}>
                Search
              </Button>
            </Col>
            <Col xs="auto">
              {this.state.showCancel ? (
                <Button
                  type="button"
                  variant="outline-primary"
                  className="mb-2"
                  onClick={this.clearSearch}
                >
                  Clear Search
                </Button>
              ) : null}
            </Col>
          </Form.Row>
        </Form>
      </>
    );
  }
}

export default SearchBar;
