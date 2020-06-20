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
  },
  { collection: "posts" }
);

const PostModel = mongoose.model("Post", postDbSchema);

// open a websocket to connect to the client
const server = module.parent.exports.server;
var io = require("socket.io").listen(server);

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  socket.on("post submit", (postData) => {
    console.log(postData);

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
    });

    post.save();
  });
});

module.exports.Model = Model;
module.exports.PostModel = PostModel;
