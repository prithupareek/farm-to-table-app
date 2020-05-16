import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Import components
import NavigationBar from "../NavigationBar";
import Map from "./components/Map";

class Dashboard extends React.Component {
  render() {
    return (
      <div className="d-flex vh-100">
        <Row className="flex-fill no-gutters">
          <Col className="d-flex flex-column h-100">
            <NavigationBar />
            <Row className="d-flex mt-3 mb-3">
              <div className="col-sm-12 my-auto text-center">
                <a
                  href="/logout"
                  className="btn btn-lg btn-outline-primary mx-auto"
                >
                  Logout
                </a>
              </div>
            </Row>
            <Row className="flex-fill">
              <Map />
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
