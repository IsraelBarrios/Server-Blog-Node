"use strict";

var jwt = require("jwt-simple");
var moment = require("moment");

var createToken = function (admin) {
  var payload = {
    sub: admin._id,
    name: admin.name,
    surname: admin.surname,
    email: admin.email,
    iat: moment().unix(),
    exp: moment().add(30, "days").unix(),
  };
  return jwt.encode(payload, process.env.JWT_TOKEN);
};

module.exports= createToken;
