import React from "react";
import ReactDOM from "react-dom";
import "./style.scss";
import Dashboard from "./components/Dashboard/Dashboard";

// console.log(window.__INITIAL_STATE__.user);

ReactDOM.render(
  <Dashboard user={window.__INITIAL_STATE__.user} />,
  document.getElementById("root")
);
