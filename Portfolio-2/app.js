const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const server = require("http").createServer(app);
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const currentStatic = require("./gulp/config").root;
const db = {
  host: "localhost",
  port: "27017",
  name: "portfolio",
  user: "",
  password: "",
};
require("./models/db-close");
require("./models/blog");
require("./models/about");
require("./models/works");
require("./models/user");

mongoose.Promise = global.Promise;
mongoose
  .connect(`mongodb://${db.host}:${db.port}/${db.name}`, {
    user: db.user,
    pass: db.password,
  })
  .catch((e) => {
    console.error(e);
    throw e;
  });
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, currentStatic)));
app.use(cookieParser());
app.use(
  session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secret: "key-secret",
    key: "session-key",
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 30 * 60 * 1000,
    },
    saveUninitialized: false,
    resave: true,
    ephemeral: true,
    rolling: true,
  })
);

require("./config-passport");
app.use(passport.initialize());
app.use(passport.session());

app.use("/", require("./routes/index"));
app.use("/works", require("./routes/works"));
app.use("/about", require("./routes/about"));
app.use("/blog", require("./routes/blog"));
app.use("/admin", require("./routes/admin"));

// 404 catch-all handler (middleware)
app.use(function (req, res, next) {
  res.status(404);
  res.render("404");
});

// 500 error handler (middleware)
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render("500");
});

server.listen(80, "0.0.0.0");
server.on("listening", function () {
  if (!fs.existsSync("src/upload")) {
    fs.mkdirSync("src/upload");
  }
  console.log(
    "Express server started on port %s at %s",
    server.address().port,
    server.address().address
  );
});

module.exports = server;
