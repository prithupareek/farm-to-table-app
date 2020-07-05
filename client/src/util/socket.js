const io = require("socket.io-client");
const emitter = require("./emitter.js");

// connect to the websocket
const socket = io.connect(
  process.env.NODE_ENV == "production"
    ? "http://ec2-3-82-122-156.compute-1.amazonaws.com:3000/"
    : "localhost:3000/"
);

socket.on("connect", () => {
  console.log("Connected to socket");
});

// when a post is submited
emitter.on("post submit", (postData) => {
  socket.emit("post submit", postData);
});

// when a search is made, or filter is added
emitter.on("database query", (req) => {
  socket.emit("database query", req);
  // console.log(req);
});

socket.on("update posts", (res) => {
  emitter.emit("update posts", res);
  // console.log(res);
});
