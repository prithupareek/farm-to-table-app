var express = require("express");
var router = express.Router();
var siteController = require("../middleware/site.js");
const path = require("path");

/* GET login page. */
router.get("/contact", siteController.render("contact.js"));
router.get(
  "/contact.js",
  siteController.file(
    path.join(path.join(__dirname, "../../dist"), "contact.js")
  )
);

module.exports = router;
