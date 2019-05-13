const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../model/User');
const Book = require('../model/Book');
router.use(passport.authenticate('jwt', {session:false})); //verifica se o user está logado;

router.get('/books', (req, res) => {
    //Função para receber dados dos livros.
    res.json({msg: "/books(GET)"});
});

router.post('/books', async (req, res) => {
    //Função para enviar dados dos livros.
    const user = await User.findById(req.user._id);
    //console.log(user);
    console.log(req);
    const book = await Book.create({
        bookID: req.body.bookID,
        pagina_atual: 0,
        status: 0
    });

    user.livros.push(book);
    await user.save();
    return res.json(book);
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