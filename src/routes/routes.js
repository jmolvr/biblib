const express = require('express');
const passport = require('passport');
const router = express.Router();
const buscarLivro = require('../controller/sugestao.js');

router.post('/sugestao', buscarLivro.gerarSugestao);

router.use(passport.authenticate('jwt', {session:false})); //verifica se o user está logado;

router.get('/books', (req, res) => {
    //Função para receber dados dos livros.
    res.json({msg: "/books(GET)"});
});

router.post('/books', (req, res) => {
    //Função para enviar dados dos livros.
    res.json({msg: "/books(POST)"});
});


router.put('/books', (req, res) => {
    //Função para atualizar livros.
    res.json({msg: "/books(PUT)"});
});


router.get('/user', (req, res) => {
    //retorna usuário
    res.json(req.user);
});

router.put('/user', (req, res) => {
    res.json({msg: "/user(PUT)"});
});


module.exports = router;