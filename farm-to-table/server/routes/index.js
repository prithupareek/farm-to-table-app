var express = require("express");
var secured = require("../middleware/secured");
var router = express.Router();
var siteController = require("../middleware/site.js");
const path = require("path");

/* GET user profile. */
router.get("/", secured(), siteController.render("index.js"));
router.get(
  "/index.js",
  secured(),
  siteController.file(path.join(path.join(__dirname, "../../dist"), "index.js"))
);
module.exports = router;
