const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20');
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

const User = require('../model/User');
const keys = require('./keys');

passport.use(
     new LocalStrategy(
         {usernameField: 'email'}, 
        async (email, password, done) => {
            try{
                const user = await User.findOne({ email: email}).select('+password').populate('livros');
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
        })
);


passport.use(
    new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: process.env.googleClientID || keys.googleClientID,
        clientSecret: process.env.googleClientSecret || keys.googleClientIDSecret
    }, 
    async (accessToken, refreshToken, profile, done) => {
        User.findOrCreate({
            email: profile._json.email,
            googleID: profile.id,
            username: profile.displayName
        }, (err, user) => {
            if(err){
                console.log(err);
                return done(err);
            }
            return done(null, user);
        })
    })
);


passport.use(
    new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.secret || keys.jwt,
    }, 
    (jwtPayload, cb) => {
        return User.findById(jwtPayload.id).populate('livros')
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        })
    })
);