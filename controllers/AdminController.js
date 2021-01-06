"use strict";

//Models
var Admin = require("../models/Admin");
//Modules
var bcrypt = require("bcrypt-nodejs");
var jwt = require("../services/jwt");

var AdminController = {
  //Save admin in the data base
  saveAdmin: function (req, res) {
    var params = req.body;

    var admin = new Admin();
    admin.name = params.name;
    admin.surname = params.surname;
    admin.email = params.email.toLowerCase();

    Admin.findOne({ email: admin.email.toLowerCase() }, (err, adminFound) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          err,
        });
      }
      if (!adminFound) {
        bcrypt.hash(params.password, null, null, (err, hash) => {
          if (err) {
            return res.status(500).send({
              status: "error",
              message: err,
            });
          }
          admin.password = hash;
          admin.save((err, adminStored) => {
            if (err) {
              return res.status(500).send({
                status: "error",
                message: err,
              });
            } else {
              return res.status(200).send({
                message:
                  "The administrator has been successfully saved in the database",
                adminStored,
              });
            }
          });
        });
      } else {
        return res.status(200).send({
          message:
            "An administrator with the same email already exists in the database",
        });
      }
    });
  },
  //Login function
  login: function (req, res) {
    var params = req.body;
    var admin = new Admin();
    admin.email = params.email.toLowerCase();
    Admin.findOne({ email: admin.email.toLowerCase() }, (err, adminFounded) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          message: err,
        });
      } else if (adminFounded) {
        bcrypt.compare(params.password, adminFounded.password, (err, check) => {
          if (err) {
            return res.status(500).send({
              status: "error",
              message: err,
            });
          }
          if (check) {
            if (params.gettoken) {
              return res.status(200).send({
                token: jwt(adminFounded),
              });
            } else {
              adminFounded.password = undefined;
              return res.status(200).send({
                message: "The administrator has been found successfully",
                adminFounded,
              });
            }
          } else {
            return res.status(200).send({
              message: "The password does not match with the email entered",
            });
          }
        });
      } else {
        return res.status(404).send({
          message: "The administrator entered does not exist in the database",
        });
      }
    });
  },
};
module.exports = AdminController;
