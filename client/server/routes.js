const app = require("./app.js").app;

var authRouter = require("./routes/auth");
var indexRouter = require("./routes/index");
var loginRouter = require("./routes/login");
var aboutRouter = require("./routes/about");
var contactRouter = require("./routes/contact");
var donateRouter = require("./routes/donate");

app.use("/", authRouter);
app.use("/", loginRouter);
app.use("/", indexRouter);
app.use("/", aboutRouter);
app.use("/", contactRouter);
app.use("/", donateRouter);
