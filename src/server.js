const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(require('./routes/routes'));
app.listen(3333);