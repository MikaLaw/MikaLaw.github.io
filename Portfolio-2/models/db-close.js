const mongoose = require("mongoose");
const db = {
  host: "localhost",
  port: "27017",
  name: "portfolio",
  user: "",
  password: "",
};

mongoose.connection.on("connected", function () {
  console.log(`Mongoose default connection open mongodb://${db.host}:${db.port}/${db.name}`);
});

// If the connection throws an error
mongoose.connection.on("error", function (err) {
  console.log("Mongoose default connection error: " + err);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", function () {
  console.log("Mongoose default connection disconnected");
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose default connection disconnected through app termination");
    process.exit(0);
  });
});
