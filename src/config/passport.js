const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const keys = require('../config/keys');

passport.use(
     new LocalStrategy({usernameField: 'email'}, async (email, password, done) => {
        try{
            const user = await User.findOne({ email: email}).select('+password');
            if(!user){
                return done(null, false, { msg: "O email não está registrado"});
            }

            if(!(await user.compareHash(password))){
                return done(null, false, {msg: "Senha incorreta"});
            }
            
            user.password = undefined;
            
            return done(null, user);
        }catch(err){
            return done(err);
        }
     }
));

passport.use(
    new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: keys.jwt,
    }, 
    (jwtPayload, cb) => {
        return User.findById(jwtPayload.id)
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        })
    })
);