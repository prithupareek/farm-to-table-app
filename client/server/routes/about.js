var express = require("express");
var router = express.Router();
var siteController = require("../middleware/site.js");
const path = require("path");

/* GET login page. */
router.get("/about", siteController.render("about.js"));
router.get(
  "/about.js",
  siteController.file(path.join(path.join(__dirname, "../../dist"), "about.js"))
);

module.exports = router;
