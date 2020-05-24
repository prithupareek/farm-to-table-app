import React, { Component } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Button from "react-bootstrap/Button";

class NewPostBtn extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.accountType == "shipper") return <></>;
    else {
      return (
        <div className="col-sm-12 my-auto text-center">
          <a
            className="btn btn-lg btn-outline-primary mx-auto"
            onClick={this.props.action}
          >
            New Post
          </a>
        </div>
      );
    }
  }
}

export default NewPostBtn;
