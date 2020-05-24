var express = require("express");
var secured = require("../middleware/secured");
var router = express.Router();
var siteController = require("../middleware/site.js");
const path = require("path");

/* GET user profile. */
router.get("/", secured(), (req, res) => {
  // console.log(req.user);

  // const userRes = Model.find({ email: req.user._json.email });
  var Model = module.parent.parent.exports.Model;

  // console.log(userRes);

  Model.find({ email: req.user._json.email }).then((users) => {
    // console.log(users[0].name); // 'A'
    siteController.render("index.js", {
      user: users[0],
    })(req, res);
  });
});

router.get(
  "/index.js",
  secured(),
  siteController.file(path.join(path.join(__dirname, "../../dist"), "index.js"))
);
module.exports = router;
