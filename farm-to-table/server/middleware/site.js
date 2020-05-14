const express = require("express");
const app = require("../app");
const template = require("../../src/template.js");

module.exports = {
  file: (HTML_FILE) => (req, res) => {
    res.sendFile(HTML_FILE);
  },
  render: (bundle_file, params = {}) => (req, res) => {
    res.send(
      template({
        bundle_file: bundle_file,
        initialState: params,
      })
    );
  },
};
