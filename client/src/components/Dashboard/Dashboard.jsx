import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

// Import components
import NavigationBar from "../NavigationBar";
import Map from "./components/Map/Map";
import NewPost from "./components/NewPost/NewPost";

class Dashboard extends React.Component {
  constructor(props) {
    super();
    // console.log(props);
    this.state = { showNewPost: false };
  }

  render() {
    return (
      <>
        <div className="d-flex vh-100">
          <Row className="flex-fill no-gutters">
            <Col className="d-flex flex-column h-100">
              <NavigationBar />
              <Row className="d-flex mt-3 mb-3">
                <Col>
                  <div className="col-sm-12 my-auto text-center">
                    <h3>Welcome, {this.props.user.name}</h3>
                  </div>
                </Col>
                <Col>
                  <div className="col-sm-12 my-auto text-center">
                    <a
                      className="btn btn-lg btn-outline-primary mx-auto"
                      onClick={() => this.setState({ showNewPost: true })}
                    >
                      New Post
                    </a>
                  </div>
                </Col>
                <Col>
                  <div className="col-sm-12 my-auto text-center">
                    <a
                      href="/logout"
                      className="btn btn-lg btn-outline-primary mx-auto"
                    >
                      Logout
                    </a>
                  </div>
                </Col>
              </Row>
              <Row className="flex-fill">
                <Map />
              </Row>
            </Col>
          </Row>
        </div>

        <Modal
          size="lg"
          scrollable
          centered
          show={this.state.showNewPost}
          onHide={() => this.setState({ showNewPost: false })}
        >
          <Modal.Header closeButton style={{ border: "none", zIndex: 1041 }} />
          <Modal.Body className="mt-n5">
            <Container className="text-left">
              <h4 className="font-weight-bold">New Post</h4>
              <NewPost />
            </Container>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default Dashboard;
