"use strict";

var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  type: { type: String, maxLength: 30 },
});

module.exports = mongoose.model("Category", CategorySchema);
