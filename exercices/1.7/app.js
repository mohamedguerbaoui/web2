var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var moviesRouter = require('./routes/movies');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const map = {}
app.use((req, res, next) => {
    const operation = req.method + ' ' + req.path;
    const compteur= map[operation];

    if(compteur === undefined) map[operation]=0;
   // const compteur2 = map[operation];
   // map[operation]= compteur2+1;
    map[operation]+=1;
  
    next();
  });

app.use('/movies', moviesRouter);
app.use('/users', usersRouter);


module.exports = app;
