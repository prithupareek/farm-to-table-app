// connect to the database

// connect to server with mongoose
var mongoose = require("mongoose"),
  Admin = mongoose.mongo.Admin;
mongoose.connect(
  "mongodb+srv://" +
    process.env.MONGODB_USERNAME +
    ":" +
    process.env.MONGODB_PASSWORD +
    "@farm-to-table-lmcdt.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("Connected to MongoDB Atlas!!!");
});

// define a schema for how the data will look
const dbSchema = new mongoose.Schema(
  {
    email: String,
    name: String,
    accountType: String,
    posts: Array,
  },
  { collection: "models" }
);

const Model = mongoose.model("Model", dbSchema);

const postDbSchema = new mongoose.Schema(
  {
    postName: String,
    postDesc: String,
    produceBudget: String,
    distributorBudget: String,
    ammount: String,
    address: String,
    address2: String,
    city: String,
    state: String,
    zip: String,
    needDistributor: Boolean,
    startDate: String,
    endDate: String,
    produceType: String,
    userEmail: String,
    postType: String,
    lat: Number,
    long: Number,
  },
  { collection: "posts" }
);

const PostModel = mongoose.model("Post", postDbSchema);

// applies the filter and returns posts the match
function applyFilter(posts, filter) {
  var res = new Set(posts);

  res.forEach((post) => {
    // filter by state
    if (filter.states.length != 0) {
      if (!filter.states.includes(post.state)) {
        res.delete(post);
        return;
      }
    }

    // filter by type
    if (filter.types.length != 0) {
      if (!filter.types.includes(post.produceType)) {
        res.delete(post);
        return;
      }
    }

    // filter by price
    if (
      (filter.minPrice != "" &&
        parseInt(filter.minPrice) > parseInt(post.produceBudget)) ||
      (filter.maxPrice != "" &&
        parseInt(filter.maxPrice) < parseInt(post.produceBudget))
    ) {
      res.delete(post);
      return;
    }

    // filter by ammount
    if (
      (filter.minQuan != "" &&
        parseInt(filter.minQuan) > parseInt(post.ammount)) ||
      (filter.maxQuan != "" &&
        parseInt(filter.maxQuan) < parseInt(post.ammount))
    ) {
      res.delete(post);
      return;
    }

    // filter by produce avalibility
    var postStartDate = new Date(
      parseInt("20" + post.startDate.substring(6, 8)),
      parseInt(post.startDate.substring(0, 2)) - 1,
      parseInt(post.startDate.substring(3, 5))
    );

    var postEndDate = new Date(
      parseInt("20" + post.endDate.substring(6, 8)),
      parseInt(post.endDate.substring(0, 2)) - 1,
      parseInt(post.endDate.substring(3, 5))
    );

    if (filter.minAval != "") {
      // convert to date
      var minAvalDate = new Date(
        parseInt("20" + filter.minAval.substring(6, 8)),
        parseInt(filter.minAval.substring(0, 2)) - 1,
        parseInt(filter.minAval.substring(3, 5))
      );

      if (postEndDate < minAvalDate) {
        res.delete(post);
        return;
      }
    }

    if (filter.maxAval != "") {
      // convert to date
      var maxAvalDate = new Date(
        parseInt("20" + filter.maxAval.substring(6, 8)),
        parseInt(filter.maxAval.substring(0, 2)) - 1,
        parseInt(filter.maxAval.substring(3, 5))
      );

      if (postStartDate > maxAvalDate) {
        res.delete(post);
        return;
      }
    }
  });

  return Array.from(res);
}

// open a websocket to connect to the client
const server = module.parent.exports.server;
var io = require("socket.io").listen(server);

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  socket.on("post submit", (postData) => {
    // console.log(postData);

    // convert the address into coordinates
    var addressString;
    if (postData.address2 == "") {
      addressString =
        postData.address +
        ", " +
        postData.city +
        ", " +
        postData.state +
        " " +
        postData.zip;
    } else {
      addressString =
        postData.address +
        ", " +
        postData.address2 +
        ", " +
        postData.city +
        ", " +
        postData.state +
        " " +
        postData.zip;
    }

    // console.log(addressString);

    var url = encodeURI(
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        addressString +
        ".json?access_token=" +
        process.env.REACT_APP_MAPBOX_TOKEN
    );

    // make http request to mapbox geocoder
    const https = require("https");

    https.get(url, (res) => {
      let data = "";

      // A chunk of data has been recieved.
      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        var coordinates = JSON.parse(data).features[0].center;

        const post = new PostModel({
          postName: postData.postName,
          postDesc: postData.postDesc,
          produceBudget: postData.produceBudget,
          distributorBudget: postData.distributorBudget,
          ammount: postData.ammount,
          address: postData.address,
          address2: postData.address2,
          city: postData.city,
          state: postData.state,
          zip: postData.zip,
          needDistributor: postData.needDistributor,
          startDate: postData.startDate,
          endDate: postData.endDate,
          produceType: postData.produceType,
          userEmail: postData.userEmail,
          postType: postData.postType,
          long: coordinates[0],
          lat: coordinates[1],
        });

        post.save();
      });
    });
  });

  socket.on("database query", (req) => {
    console.log(req);

    var accountTypeName;

    if (req.query.accountType == "grower") {
      accountTypeName = "foodbank";
    } else if (req.query.accountType == "foodbank") {
      accountTypeName = "grower";
    } else {
      accountTypeName = "";
    }

    var res = new Set();

    // searches through the mongodb database (fuzzy)
    PostModel.find(
      {
        postName: {
          $regex: req.query.query,
          $options: "i",
        },
        postType: accountTypeName,
      },
      function (err, docs) {
        // console.log("PostName Search");
        // console.log(docs);

        docs.forEach((post) => {
          res.add(JSON.stringify(post));
        });

        PostModel.find(
          {
            postDesc: {
              $regex: req.query.query,
              $options: "i",
            },
            postType: accountTypeName,
          },
          function (err, docs) {
            // console.log("PostDesc Search");
            // console.log(docs);

            docs.forEach((post) => {
              res.add(JSON.stringify(post));
            });

            PostModel.find(
              {
                address: {
                  $regex: req.query.query,
                  $options: "i",
                },
                postType: accountTypeName,
              },
              function (err, docs) {
                // console.log("Address Search");
                // console.log(docs);

                docs.forEach((post) => {
                  res.add(JSON.stringify(post));
                });

                PostModel.find(
                  {
                    address2: {
                      $regex: req.query.query,
                      $options: "i",
                    },
                    postType: accountTypeName,
                  },
                  function (err, docs) {
                    // console.log("Address2 Search");
                    // console.log(docs);

                    docs.forEach((post) => {
                      res.add(JSON.stringify(post));
                    });

                    PostModel.find(
                      {
                        city: {
                          $regex: req.query.query,
                          $options: "i",
                        },
                        postType: accountTypeName,
                      },
                      function (err, docs) {
                        // console.log("City Search");
                        // console.log(docs);

                        docs.forEach((post) => {
                          res.add(JSON.stringify(post));
                        });

                        PostModel.find(
                          {
                            state: {
                              $regex: req.query.query,
                              $options: "i",
                            },
                            postType: accountTypeName,
                          },
                          function (err, docs) {
                            // console.log("State Search");
                            // console.log(docs);

                            docs.forEach((post) => {
                              res.add(JSON.stringify(post));
                            });

                            PostModel.find(
                              {
                                produceType: {
                                  $regex: req.query.query,
                                  $options: "i",
                                },
                                postType: accountTypeName,
                              },
                              function (err, docs) {
                                // console.log("Type Search");
                                // console.log(docs);

                                docs.forEach((post) => {
                                  res.add(JSON.stringify(post));
                                });

                                // console.log(res);
                                var postJSONS = [];
                                res.forEach((string) => {
                                  postJSONS.push(JSON.parse(string));
                                });
                                // console.log(postJSONS);

                                // appy the filters to the search results
                                postJSONS = applyFilter(postJSONS, req.filter);

                                socket.emit("update posts", postJSONS);
                              }
                            );
                          }
                        );
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }
    );
  });
});

module.exports.Model = Model;
module.exports.PostModel = PostModel;
