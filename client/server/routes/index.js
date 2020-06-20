var express = require("express");
var secured = require("../middleware/secured");
var router = express.Router();
var siteController = require("../middleware/site.js");
const path = require("path");

/* GET user profile. */
router.get("/", secured(), (req, res) => {
  // console.log(req.user);

  var Model = module.parent.parent.exports.Model;

  Model.find({ email: req.user._json.email }).then((users) => {
    // console.log(users[0].name); // 'A'
    const user = users[0];

    siteController.render("index.js", {
      user: user,
    })(req, res);

    var PostModel = module.parent.parent.exports.PostModel;

    if (user.accountType == "grower") {
      PostModel.find({ postType: "foodbank" }).then((posts) => {
        console.log(posts);
      });
    } else if (user.accountType == "foodbank") {
      PostModel.find({ postType: "grower" }).then((posts) => {
        console.log(posts);
      });
    } else {
      console.log("Distributor Posts");
    }
  });
});

router.get(
  "/index.js",
  secured(),
  siteController.file(path.join(path.join(__dirname, "../../dist"), "index.js"))
);
module.exports = router;
