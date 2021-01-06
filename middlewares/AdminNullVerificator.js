"use strict";

var validator = require("validator");

var verificatorAdmin = function (req, res, next) {
  var params = req.body;

  if (
    !params.name ||
    !params.surname ||
    !params.email ||
    !params.password ||
    validator.isEmail(params.email)
  ) {
    return res.status(400).send({
      message: "Some of the sent parameters are missing",
    });
  } else {
    next();
  }
};

module.exports = verificatorAdmin;
