"use strict";

var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  name: { type: String, maxLength: 30 },
  surname: { type: String, maxLength: 30 },
  email: { type: String, maxLength: 30 },
  password: { type: String, maxLength: 400 },
});

module.exports = mongoose.model("Admin", AdminSchema);
