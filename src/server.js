const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const keys = require('./config/keys');
require('./config/passport-setup');

const app = express();
app.use(cors());

mongoose.connect(process.env.mongoDB || keys.mongoDB, { useNewUrlParser: true, useCreateIndex: true})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/auth',require('./routes/auth_routes.js'));

app.use(require('./routes/routes'));

app.listen(process.env.PORT || 3333);