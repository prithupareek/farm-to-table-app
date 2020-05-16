var express = require("express");
var router = express.Router();
var siteController = require("../middleware/site.js");
const path = require("path");

/* GET login page. */
router.get("/donate", siteController.render("donate.js"));
router.get(
  "/donate.js",
  siteController.file(
    path.join(path.join(__dirname, "../../dist"), "donate.js")
  )
);

module.exports = router;
