const mongoose = require("mongoose");
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const db = {
  host: "localhost",
  port: "27017",
  name: "portfolio",
  user: "",
  password: "",
};
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
require("./models/db-close");
let login = "",
  password = "";
rl.question("Логин: ", (answer) => {
  login = answer;
  rl.question("Пароль: ", (answer) => {
    password = answer;
    rl.close();
  });
});
rl.on("close", () => {
  require("./models/user");
  const User = mongoose.model("user"),
    adminUser = new User({ login: login, password: password });
  User.findOne({ login: login })
    .then((u) => {
      if (u) {
        throw new Error("Такой пользователь уже существует!");
      }
      return adminUser.save();
    })
    .then(
      (u) => console.log("ok!"),
      (e) => console.error(e.message)
    )
    .then(() => process.exit(0));
});
