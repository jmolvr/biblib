const express = require('express');
const routes = express.Router();
const AuthController = require('../controller/authController');

routes.post("/register", AuthController.register);

routes.post("/login", (req, res) => {
    //implementar login c/ passport
});

module.exports = routes;