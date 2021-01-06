"use strict";

var verificatorNull = function (req, res, next) {
  var params = req.body;
  if (
    !params.title ||
    !params.content ||
    !params.imageMain ||
    !params.category
  ) {
    return res.status(400).send({
      message: "Some of the sent parameters are missing",
    });
  } else {
    next();
  }
};

module.exports = verificatorNull;
