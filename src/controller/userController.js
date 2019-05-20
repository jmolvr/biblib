const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const keys = require('../config/keys');

class AuthController{
    async register(req, res){
        const {email, password, password2, username} = req.body;
        try{
            if( await User.findOne( {email })){
               return res.status(400).json( { error: "Email já utilizado!"});
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
            //user.generateToken();
            const token = jwt.sign({id: user.id }, process.env.secret || keys.jwt, {
                expiresIn: 86400
            });
            return res.json( { user , token});
        }catch (err) {
            return res.status(400).json({ error: "Registro falhou"});
        }
    }
    
    async login(req, res, next){
        passport.authenticate('local', {session: false}, (err, user, info) => {
            if(err || !user){
                return res.status(400).json(info);
            }
            req.login(user, {session: false}, (err) => {
                if(err){
                    return res.send(err);
                }
                const token = jwt.sign({id: user.id }, process.env.secret || keys.jwt, {
                    expiresIn: 86400
                });
                return res.json({user, token});
            });
        })(req, res);
    }

    async googleStrategy(req, res, next){
        passport.authenticate('google', {session:false}, (err, user, info) => {
            if(err || !user){
                return res.status(400).json("Error");
            }
            req.login(user, {session: false}, (err) => {
                if(err){
                    return res.json(err);
                }
                const token = jwt.sign({id: user.id}, process.env.secret || keys.jwt, {
                    expiresIn: 86400
                });
                return res.json({user, token});
            });
        })(req, res);
    }

    async getUser(req, res) {
        let user = req.user;
        user._id = undefined;
        return res.json(req.user);
    }

    async putUser(req, res){

    }

    async deleteUser(req, res){

    }
}

module.exports = new AuthController();