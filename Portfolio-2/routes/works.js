const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
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
    title: "Портфолио",
  };
  const Model = mongoose.model("works");
  Model.find().then((items) => {
    obj = { ...obj, portfolioWorks: items };
    res.render("pages/works", obj);
  });
});

router.post("/", isAdmin, (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.message) {
    res.json({ status: "Укажите данные" });
  } else {
    const mail = {
      subject: "Сообщение с сайта-портфолио",
      smtp: {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "reoktis.n@gmail.com",
          pass: "k107riku985h",
        },
      },
    };
    const transporter = nodemailer.createTransport(mail.smtp);

    const mailOptions = {
      from: `"${req.body.username}" <${req.body.email}>`,
      to: mail.smtp.auth.user,
      subject: mail.subject,
      text: req.body.message.trim().slice(0, 500) + `\n Отправлено с: <${req.body.email}>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ status: "При отправке письма произошла ошибка" });
      }
      res.json({ status: "Письмо успешно отправлено" });
    });
  }
});

router.post("/uploads", isAdmin, (req, res) => {
  let form = new formidable.IncomingForm();
  form.uploadDir = path.join(process.cwd(), "public/upload");
  form.parse(req, function (err, fields, files) {
    if (err) {
      return res.json({ status: "Не удалось загрузить картинку" });
    }
    if (!fields.name || !fields.tech || !fields.link) {
      fs.unlink(files.photo.originalFilename);
      return res.json({ status: "Заполните все поля!" });
    }

    fs.rename(files.photo.filepath, path.join("src/upload", files.photo.originalFilename), function (err) {
      if (err) {
        fs.unlink(path.join("src/upload", files.photo.originalFilename));
        fs.rename(files.photo.filepath, files.photo.originalFilename);
      }
      let dir = "/upload";

      const WorksModel = mongoose.model("works");
      const UserWorks = new WorksModel({ title: fields.name, tech: fields.tech, link: fields.link, picture: path.join(dir, files.photo.originalFilename) });
      UserWorks.save()
        .then(() => {
          res.json({ status: "Данные успешно загружены" });
        })
        .catch((e) => {
          res.json({ status: "При добавление записи произошла ошибка: " + e.message });
        });
    });
  });
});

module.exports = router;
