import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const emitter = require("../../../../util/emitter.js");

class SearchBar extends Component {
  constructor(props) {
    super(props);

    // console.log(props);

    // console.log(props.accountType);

    this.state = {
      query: "",
      showCancel: false,
    };

    this.search = () => {
      if (!(this.state.query == "")) {
        emitter.emit("search submit", {
          query: this.state.query,
          accountType: props.accountType,
        });
        this.setState({ query: this.state.query, showCancel: true });
        // console.log(this.state);
      }
    };

    this.clearSearch = () => {
      this.state.query = "";
      this.state.showCancel = false;
      this.setState({ query: "", showCancel: false });
      this.refs["search"].value = "";
      emitter.emit("search submit", {
        query: this.state.query,
        accountType: props.accountType,
      });
      // console.log(this.state);
    };

    // this.handleKeyPress = (target) => {
    //   if (target.charCode == 13) {
    //     this.search();
    //     alert("enter pressed");
    //   }
    // };
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
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    this.search();
                  }
                }}
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
