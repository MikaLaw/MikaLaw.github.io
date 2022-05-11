const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const formidable = require("formidable");
let isAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
};

router.get("/", (req, res) => {
  let obj = {
    title: "Блог",
  };
  const Model = mongoose.model("blog");
  Model.find().then((items) => {
    obj = { ...obj, newArticles: items };
    res.render("pages/blog", obj);
  });
});

router.post("/", isAdmin, (req, res) => {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (!fields.title || !fields.date || !fields.desc) {
      return res.json({ status: "Заполните все поля!" });
    }

    const BlogModel = mongoose.model("blog");
    const UserBlog = new BlogModel({ title: fields.title, date: new Date(fields.date), body: fields.desc });
    UserBlog.save()
      .then(() => {
        res.json({ status: "Данные успешно загружены" });
      })
      .catch((e) => {
        res.json({ status: "При добавление записи произошла ошибка: " + e.message });
      });
  });
});

module.exports = router;
