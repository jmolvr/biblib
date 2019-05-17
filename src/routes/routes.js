const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../model/User');
const Book = require('../model/Book');
const BookController = require('../controller/bookController');

router.use(passport.authenticate('jwt', {session:false})); //verifica se o user está logado;

router.get('/books', (req, res) => {
    //Função para retornar dados dos livros.
    res.json({msg: "/books(GET)"});
});

router.post('/book', BookController.registerBook);


router.put('/books', (req, res) => {
    //Função para atualizar informações dos livros.
    res.json({msg: "/books(PUT)"});
});


router.get('/user', (req, res) => {
    //retorna informações do usuário, inclusive livros
    res.json(req.user);
});

router.put('/user', (req, res) => {
    res.json({msg: "/user(PUT)"});
});


module.exports = router;