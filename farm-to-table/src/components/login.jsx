import React from "react";
// import "../style.scss";
// import "bootstrap/dist/css/bootstrap.min.css";

class Login extends React.Component {
  render() {
    return (
      <div className="container h-100">
        <div className="row h-100">
          <div className="col-sm-12 my-auto text-center">
            <a
              href="/loginRedirect"
              className="btn btn-lg btn-outline-primary mx-auto"
            >
              &nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
