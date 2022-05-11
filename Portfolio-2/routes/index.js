const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res) => {
  let obj = {
    title: "Авторизация",
  };
  res.render("pages/index", obj);
});

router.post("/", (req, res, next) => {
  passport.authenticate("loginUsers", (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ status: "Укажите правильный логин и пароль!" });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.json({ status: "Все ок, Добро пожаловать" });
    });
  })(req, res, next);
});

module.exports = router;
