const express = require('express');
const passport = require('passport');
const router = express.Router();
const AuthController = require('../controller/userController');
router.get('/teste', (req, res) => {
    res.json({msg: 'olamundo'});
})
router.post("/register", AuthController.register);

router.get("/login", AuthController.login);

router.get("/logout");
router.get("/google", passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email']
}));

//callback for google strategy
router.get('/google/redirect',AuthController.googleStrategy);

module.exports = router;