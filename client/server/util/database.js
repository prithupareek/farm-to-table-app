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
    price: String,
    ammount: String,
    address: String,
    address2: String,
    city: String,
    state: String,
    zip: String,
    needTransport: Boolean,
    userEmail: String,
    postType: String,
    lat: Number,
    long: Number,
  },
  { collection: "posts" }
);

// postDbSchema.index({
//   postName: "text",
//   postDesc: "text",
//   address: "text",
//   address2: "text",
//   city: "text",
//   state: "text",
// });

const PostModel = mongoose.model("Post", postDbSchema);

// open a websocket to connect to the client
const server = module.parent.exports.server;
var io = require("socket.io").listen(server);

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  socket.on("post submit", (postData) => {
    console.log(postData);

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
          price: postData.price,
          ammount: postData.ammount,
          address: postData.address,
          address2: postData.address2,
          city: postData.city,
          state: postData.state,
          zip: postData.zip,
          needTransport: postData.needTransport,
          userEmail: postData.userEmail,
          postType: postData.postType,
          long: coordinates[0],
          lat: coordinates[1],
        });

        post.save();
      });
    });
  });

  // when a search is made
  socket.on("search submit", (query) => {
    console.log(query);

    var res = new Set();

    // searches through the mongodb database (fuzzy)
    PostModel.find({ postName: { $regex: query, $options: "i" } }, function (
      err,
      docs
    ) {
      console.log("PostName Search");
      // console.log(docs);

      docs.forEach((post) => {
        res.add(JSON.stringify(post));
      });

      PostModel.find({ postDesc: { $regex: query, $options: "i" } }, function (
        err,
        docs
      ) {
        console.log("PostDesc Search");
        // console.log(docs);

        docs.forEach((post) => {
          res.add(JSON.stringify(post));
        });

        PostModel.find({ address: { $regex: query, $options: "i" } }, function (
          err,
          docs
        ) {
          console.log("Address Search");
          // console.log(docs);

          docs.forEach((post) => {
            res.add(JSON.stringify(post));
          });

          PostModel.find(
            { address2: { $regex: query, $options: "i" } },
            function (err, docs) {
              console.log("Address2 Search");
              // console.log(docs);

              docs.forEach((post) => {
                res.add(JSON.stringify(post));
              });

              PostModel.find(
                { city: { $regex: query, $options: "i" } },
                function (err, docs) {
                  console.log("City Search");
                  // console.log(docs);

                  docs.forEach((post) => {
                    res.add(JSON.stringify(post));
                  });

                  PostModel.find(
                    { state: { $regex: query, $options: "i" } },
                    function (err, docs) {
                      console.log("State Search");
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

                      socket.emit("search result", postJSONS);
                    }
                  );
                }
              );
            }
          );
        });
      });
    });
  });
});

module.exports.Model = Model;
module.exports.PostModel = PostModel;
