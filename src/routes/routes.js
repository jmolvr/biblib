const express = require('express');
const routes = express.Router();
routes.get("/cadastro", (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;
    const usrnmbr = req.body.usrnmbr;
    res.json({
        email:email,
        senha:senha,
        usr:usrnmbr
    });
});
routes.post("/login", (req, res) => {
    //implementar login c/ passport
});

module.exports = routes;