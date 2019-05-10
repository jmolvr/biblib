const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');
require('./config/passport');
const app = express();

mongoose.connect(keys.mongoDB, { useNewUrlParser: true})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));
//app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(require('./routes/routes'));
app.use('/auth',require('./routes/auth_routes.js'));
app.listen(3333);