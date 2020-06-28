import React from "react";
import ReactDOM from "react-dom";
import "./style.scss";
import Dashboard from "./components/Dashboard/Dashboard";

var socket = require("./util/socket.js");

console.log(window.__INITIAL_STATE__.user);
console.log(window.__INITIAL_STATE__.posts);

ReactDOM.render(
  <Dashboard
    user={window.__INITIAL_STATE__.user}
    posts={window.__INITIAL_STATE__.posts}
  />,
  document.getElementById("root")
);
