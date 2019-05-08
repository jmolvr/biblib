const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://guaribati:<password>@cluster0-pgacx.mongodb.net/test?retryWrites=true', 
    {useNewUrlParser: true}
);

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(require('./routes/routes'));
app.listen(3333);