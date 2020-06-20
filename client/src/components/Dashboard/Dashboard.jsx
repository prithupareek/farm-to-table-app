import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";

// Import components
import NavigationBar from "../NavigationBar";
import Map from "./components/Map/Map";
import NewPost from "./components/NewPost/NewPost";
import NewPostBtn from "./components/NewPostBtn";

class Dashboard extends React.Component {
  constructor(props) {
    super();

    // Bind the this context to the handler function
    this.handler = this.handler.bind(this);

    this.state = { showNewPost: false };
  }

  // This method will be sent to the child component
  handler() {
    this.setState({
      showNewPost: true,
    });
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
                  <NewPostBtn
                    accountType={this.props.user.accountType}
                    action={this.handler}
                  />
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
              <NewPost
                accountType={this.props.user.accountType}
                userEmail={this.props.user.email}
              />
            </Container>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default Dashboard;
