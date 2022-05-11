const express = require("express");
const router = express.Router();

let isAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
};

router.get("/", isAdmin, (req, res) => {
  let obj = {
    title: "Админка",
  };
  res.render("pages/admin", obj);
});

module.exports = router;
