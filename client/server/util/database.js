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
const dbSchema = new mongoose.Schema({
  email: String,
  name: String,
  accountType: String,
  posts: Array,
});

const Model = mongoose.model("Model", dbSchema);

// open a websocket to connect to the client
const server = module.parent.exports.server;
var io = require("socket.io").listen(server);

console.log(server);

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  //   // makes sure the user is authorized before emitting socket stuff
  //   if (authCheck.isAuth(socket.request.session.passport)) {
  //     // Send initial RAM state
  //     socket.emit("ramState", ramstate);
  //     socket.emit("paramUpdate", ramparams);

  //     // emit an event to the socket if you recieve an event from the emmitter
  //     emitter.on("data recieved", (hookData) => {
  //       socket.emit("dataRecieved", hookData);
  //     });

  //     emitter.on("ram state", () => {
  //       socket.emit("ramState", ramstate);
  //     });

  //     emitter.on("param update", () => {
  //       socket.emit("paramUpdate", ramparams);
  //     });
  //   }
});

module.exports = Model;
