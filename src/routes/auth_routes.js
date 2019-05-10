const express = require('express');
const passport = require('passport');
const auth_routes = express.Router();
auth_routes.use(passport.authenticate('jwt', {session:false}));
auth_routes.get('/books', (req, res) => {
    //Função para receber dados dos livros.
    res.json({Mensagem: "Oi. Esta função funciona?"});
})
auth_routes.post('/books', (req, res) => {
    //Função para enviar dados dos livros.
    res.json({Mensagem: "A"});
})
auth_routes.put('/books', (req, res) => {
    //Função para atualizar livros.
    res.json({Mensagem: "B"});
})
auth_routes.get('/user', (req, res) => {
    res.json({Mensagem: "C"});
})
auth_routes.put('/user', (req, res) => {
    res.json({Mensagem: "D"});
})
module.exports = auth_routes;