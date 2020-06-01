var express = require("express");
var secured = require("../middleware/secured");
var router = express.Router();
var siteController = require("../middleware/site.js");
const path = require("path");

/* GET user profile. */
router.get("/", siteController.render("comingsoon.js"));
router.get(
  "/comingsoon.js",
  siteController.file(
    path.join(path.join(__dirname, "../../dist"), "comingsoon.js")
  )
);
module.exports = router;
