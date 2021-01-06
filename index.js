"use strict";

var app = require("./app");
const mongoose = require("mongoose");
require('dotenv').config();
var port = process.env.PORT || 3999;
mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}).then(() => {
    console.log("Succes in the connection to DB");
}).catch((error) => console.log(error));

app.listen(port, () => {
  console.log(`Server working on port: ${port}`);
});
