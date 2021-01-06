"use strict";

var Category = require("../models/Category");

var CategoryController = {
  getCategoryes: function (req, res) {
    Category.find({}, (err, categoryes) => {
      if (err) {
        return res.status(500).send({
          status:"error",
          err
        });
      } 
      if(!categoryes){
        return res.status(404).send({
            message:"No category has been found"
          });
      }
      else {
        return res.status(200).send({
            categoryes,
        });
      }
    });
  },
};
module.exports=CategoryController;
