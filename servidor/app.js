var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');

var animalRouter = require('./routes/animal');
var serviceRouter = require('./routes/service');
var productRouter = require('./routes/product');
var userRouter = require('./routes/user');
var utilsRouter = require('./routes/utils');

mongoose.connect('mongodb://localhost:27017/petshop', {useNewUrlParser: true});

var cors = require('cors')
var app = express();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/user', userRouter);
app.use('/utils', utilsRouter);
app.use('/animal', animalRouter);
app.use('/product', productRouter);
app.use('/service', serviceRouter);

module.exports = app;
