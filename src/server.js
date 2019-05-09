const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();

mongoose.connect(keys.mongoDB, { useNewUrlParser: true})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(require('./routes/routes'));
app.listen(3333);