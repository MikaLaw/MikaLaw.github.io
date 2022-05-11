"use strict";

// const mongoose = require("mongoose"),
//   Schema = mongoose.Schema,
//   AboutSchema = new Schema({
//     title: {
//       type: String,
//       required: [true, "Укажите название группы"],
//     },
//     desc: {
//       type: String,
//       required: [true, "Укажите описание технологии"],
//     },
//     picture: {
//       type: String,
//       required: [true, "Укажите картинку"],
//     },
//   });

const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  AboutSchema = new Schema({
    group: {
      type: String,
      required: [true, "Укажите название группы"],
    },
    technology: [
      {
        desc: {
          type: String,
          required: [true, "Укажите описание технологии"],
        },
        picture: {
          type: String,
          required: [true, "Укажите картинку"],
        },
      },
    ],
  });

mongoose.model("about", AboutSchema);
