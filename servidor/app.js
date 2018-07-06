var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
var userRouter = require('./routes/user');
var utilsRouter = require('./routes/utils');
mongoose.connect('mongodb://localhost:27017/petshop');

var cors = require('cors')
var app = express();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/user', userRouter);
app.use('/utils', utilsRouter);
module.exports = app;
