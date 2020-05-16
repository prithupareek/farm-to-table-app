import React from "react";
// import "../style.scss";
// import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// Import components
import NavigationBar from "../NavigationBar";

class Dashboard extends React.Component {
  render() {
    return (
      <div className="d-flex vh-100">
        <Row className="flex-fill no-gutters">
          <Col className="d-flex flex-column h-100">
            <NavigationBar />
            <Row className="flex-fill no-gutters p-3">
              <div className="col-sm-12 my-auto text-center">
                <h1>Dashboard</h1>
                <a
                  href="/logout"
                  className="btn btn-lg btn-outline-primary mx-auto"
                >
                  Logout
                </a>
              </div>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
