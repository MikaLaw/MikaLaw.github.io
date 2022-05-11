"use strict";
var jsonfile = require("jsonfile");
var file = "version.json";
var obj = {
  version: $.env === "dev" ? "" : `?rel=${Math.ceil(Math.random() * 100000)}`,
  suffix: $.env === "dev" ? "" : ".min",
};

module.exports = function () {
  $.gulp.task("create:version", function (cb) {
    jsonfile.writeFile(file, obj, function (err) {
      cb();
    });
  });
};
