// routes/login.js

var express = require("express");
var router = express.Router();
var siteController = require("../middleware/site.js");
const path = require("path");

/* GET login page. */
router.get("/login", siteController.render("login.js"));
router.get(
  "/login.js",
  siteController.file(path.join(path.join(__dirname, "../../dist"), "login.js"))
);

module.exports = router;
