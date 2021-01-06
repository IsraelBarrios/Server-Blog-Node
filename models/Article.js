"use strict";

var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: { type: String, maxLength: 90 },
  content: { type: [String], maxLength: 1000 },
  imageMain: { type: String, maxLength: 600 },
  category: { type: String, maxLength: 60 },
  creationDate: { type: Date, default: Date.now },
});

ArticleSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Article", ArticleSchema);
