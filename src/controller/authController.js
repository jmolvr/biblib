//Aqui ficarão as rotas referentes à login, logout e talvez criação de user
//Projeto do rocketseat o registro de novos clientes fica aqui
const mongoose = require('mongoose');

const User = require('../model/User');

class AuthController{
    async register(req, res){
        console.log(req.body)
        const {email, password, password2, username} = req.body;   
        try{
            if( await User.findOne( {email })){
                res.status(400).json( { error: "Usuário já existe"});
            }
            
            if ( password !== password2){
                res.status(400).json({ error: "As senhas são diferentes"});
            }

            const user = await User.create( {
                email: email,
                password: password,
                username: username,
            });
            user.password = undefined;
            return res.json( { user });
        }catch (err) {
            console.log(err);
            res.status(400).json({ error: "Registro falhou"});
        }
    }
    
    async login(req, res){
    
    }
}

module.exports = new AuthController();