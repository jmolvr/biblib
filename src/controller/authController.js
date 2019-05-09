const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const keys = require('../config/keys');

class AuthController{
    async register(req, res){
        const {email, password, password2, username} = req.body;   
        try{
            if( await User.findOne( {email })){
               return res.status(400).json( { error: "Usuário já existe"});
            }
            
            if ( password !== password2){
                return res.status(400).json({ error: "As senhas são diferentes"});
            }

            const user = await User.create( {
                email: email,
                password: password,
                username: username,
            });
            
            user.password = undefined; 

            return res.json( { user });
        }catch (err) {
            return res.status(400).json({ error: "Registro falhou"});
        }
    }
    
    async login(req, res, next){
        console.log('To sendo chamado');
        passport.authenticate('local', {session: false}, (err, user, info) => {
            console.log(err);
            if(err || !user){
                return res.status(400).json({
                    message: 'Something is not right',
                    user: user
                });
            }
            console.log("Olá, finalmente");
            req.login(user, {session: false}, (err) => {
                if(err){
                    return res.send(err);
                }
                const token = jwt.sign({id: user.id }, keys.jwt, {
                    expiresIn: 86400
                });
                return res.json({user, token});
            });
        })(req, res);
    }
}

module.exports = new AuthController();