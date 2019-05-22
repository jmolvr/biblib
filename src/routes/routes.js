const express = require('express');
const passport = require('passport');
const router = express.Router();
const UserController = require('../controller/UserController');
const BookController = require('../controller/bookController');
const SugestaoController = require('../controller/sugestaoController');

//rotas de usuários
router.use(passport.authenticate('jwt', {session:false})); //verifica se o user está logado;

router.get('/users', UserController.getUser);

router.put('/users/:id', UserController.putUser);

router.delete('/users/:id', UserController.deleteUser);


//rotas de livros

//retorna todos os livros do usuário
router.get('/books', BookController.showBooks);

//retorna um livro em especifico do usuário
router.get('/books/:id', BookController.getBook);

//registra um novo livro
router.post('/books', BookController.registerBook);

//atualiza informações do livro
router.put('/books/:id', BookController.updateBook);

//deletar livro
router.delete('/books/:id', BookController.deleteBook);

//retorna um json com 4 sugestões
router.get('/sugestao', SugestaoController.gerarSugestao);



module.exports = router;