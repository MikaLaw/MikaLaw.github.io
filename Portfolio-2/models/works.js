"use strict";

const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  WorksSchema = new Schema({
    title: {
      type: String,
      required: [true, "Укажите название проекта"],
    },
    tech: {
      type: String,
      required: [true, "Укажите технологии"],
    },
    link: {
      type: String,
      required: [true, "Укажите ссылку на проект"],
    },
    picture: {
      type: String,
      required: [true, "Укажите картинку"],
    },
  });

mongoose.model("works", WorksSchema);
