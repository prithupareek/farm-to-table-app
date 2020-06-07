import React from "react";
import "../style.scss";
// import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaInstagram, FaFacebook } from "react-icons/fa";

class Login extends React.Component {
  render() {
    return (
      <div className="d-flex vh-100">
        <Row className="flex-fill no-gutters">
          <Col className="d-flex flex-column h-100">
            <Row className="d-flex pt-5">
              <div className="col-sm-12 my-auto text-center">
                <img
                  src="/public/assets/farmtotable-logo.png"
                  style={{ width: "30%", height: "auto" }}
                  className="d-inline-block align-middle"
                />
                <h3>Something really great is coming soon!</h3>
                <h5>Follow us on social media to stay tuned for updates.</h5>
              </div>
            </Row>
            <Row className="d-flex pt-5 justify-content-center">
              <div className="col-sm-6">
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe src="https://www.youtube.com/embed/xz_gg_e8eP0"></iframe>
                </div>
              </div>
            </Row>
            <Row className="d-flex pt-5">
              <div className="col-sm-12 text-center my-auto">
                <a
                  href="https://www.instagram.com/farm.to.table.app/"
                  className="btn"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.facebook.com/farm.to.table.app1/"
                  className="btn"
                >
                  <FaFacebook></FaFacebook>
                </a>
              </div>
            </Row>
          </Col>
        </Row>
      </div>

      // <Container fluid>
      //   <Row>
      //     <h1>Farm to Table</h1>
      //   </Row>
      //   <Row>
      // <iframe
      //   width="auto"
      //   height="100%"
      //   src="https://www.youtube.com/embed/ukgCbXhFWsA"
      //   frameborder="0"
      //   allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      //   allowfullscreen
      // ></iframe>
      //   </Row>
      // </Container>
    );
  }
}

export default Login;
