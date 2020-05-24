const io = require("socket.io-client");

const socket = io.connect(
  process.env.NODE_ENV == "production"
    ? "http://ec2-3-82-122-156.compute-1.amazonaws.com:3000/"
    : "localhost:3000/"
);

socket.on("connect", () => {
  console.log("Connected to socket");
});
