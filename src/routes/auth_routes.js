const express = require('express');
const passport = require('passport');
const router = express.Router();
const UserController = require('../controller/userController');
/*Rotas para registro e para autenticação, assim como rotas de redirecionamento*/

/*  Recebe email, password, password2 e username
    Se o email já for cadastrado => {msg: "Email já utilizado"}
    Se password != password2 => {msg: "As senhas são diferentes"}
    Se tudo passar, o user é criado e é retornado um json com o
    user e um token
*/
router.post("/register", UserController.register);
/*  O login recebe email e senha, caso passem, as informações do usuário
    e um token são enviados.
*/
router.get("/login", UserController.login);
/*  O logout funciona da seguinte forma:
    O cliente deve excluir o JWT
    Se o user conseguir guardar o JWT, ele poderá ter acesso ao sistema,
    Uma solução seria colocar o redis para armazenar tokens inválidos e
    verificar em toda requisição se o JWT usado está nesta lista.
*/
router.get("/logout");

/*  Rota de login com google usando passportjs
    Informa que não vai salvar o usuário no session e 
    que vai usar informações de perfil e o email do user.
*/
router.get("/google", passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email']
}));

/*  Rota de callback da estratégia de autenticação com o google
    Chamada quando o login com o google dá certo
    Aqui são verificados se o user já existe, se não ele é criado
    e é retornado o user e o JWT.
*/
router.get('/google/redirect', UserController.googleStrategy);

module.exports = router;