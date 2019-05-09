const express = require('express');
const passport = require('passport');
const routes = express.Router();
const AuthController = require('../controller/authController');

routes.post("/register", AuthController.register);

routes.post("/login", AuthController.login);
routes.get('/testeAutenticacao', passport.authenticate('jwt', {session: false}), (req, res) =>{
    res.json({teste: "logado"});
});
module.exports = routes;