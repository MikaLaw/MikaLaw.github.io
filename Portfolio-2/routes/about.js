const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
let isAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
};

router.get("/", (req, res) => {
  let obj = {
    title: "Обо мне",
  };
  const Model = mongoose.model("about");
  Model.find().then((items) => {
    obj = { ...obj, allSkills: items };
    res.render("pages/about", obj);
  });
});

router.post("/", isAdmin, (req, res) => {
  let form = new formidable.IncomingForm();
  form.uploadDir = path.join(process.cwd(), "src/upload");
  form.parse(req, function (err, fields, files) {
    if (err) {
      return res.json({ status: "Не удалось загрузить картинку" });
    }
    if (!fields.tech || !fields.name) {
      fs.unlink(files.photo.originalFilename);
      return res.json({ status: "Заполните все поля!" });
    }
    const AboutModel = mongoose.model("about");
    fs.rename(
      files.photo.filepath,
      path.join("src/upload", files.photo.originalFilename),
      function (err) {
        if (err) {
          fs.unlink(path.join("src/upload", files.photo.originalFilename));
          fs.rename(files.photo.filepath, files.photo.originalFilename);
        }

        let dir = "/upload";
        let newTechData = {
          desc: fields.tech,
          picture: path.join(dir, files.photo.originalFilename),
        };
        AboutModel.findOne({ group: fields.name }).then((tech) => {
          if (tech === null) {
            let AboutUser = new AboutModel({
              group: fields.name,
              technology: [newTechData],
            });
            AboutUser.save()
              .then(() => {
                res.json({ status: "Данные успешно загружены" });
              })
              .catch((e) => {
                res.json({
                  status:
                    "При добавление записи произошла ошибка: " + e.message,
                });
              });
          } else {
            AboutModel.findOneAndUpdate(
              { group: fields.name },
              {
                $push: {
                  technology: newTechData,
                },
              },
              { new: true }
            )
              .then(() => {
                res.json({ status: "Данные успешно загружены" });
              })
              .catch((e) => {
                res.json({
                  status:
                    "При добавление записи произошла ошибка: " + e.message,
                });
              });
          }
        });
      }
    );
  });
});

module.exports = router;
