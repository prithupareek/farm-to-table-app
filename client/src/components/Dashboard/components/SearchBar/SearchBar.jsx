import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { query: "" };

    this.search = () => {
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
                placeholder="Start typing to search"
                onChange={(event) => {
                  this.state.query = event.target.value;
                }}
              />
            </Col>
            <Col xs="auto">
              <Button type="submit" className="mb-2" onClick={this.search}>
                Search
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </>
    );
  }
}

export default SearchBar;
