const express = require('express');
const routes = express.Router();


routes.post("/user");
routes.get("/boxes/");

module.exports = routes;