'use strict'

const express = require('express');
var router=require('./router');
var bodyParser = require('body-parser')
var app =express();

//Middlewares
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

//Router
app.use('/api',router);


module.exports =  app;