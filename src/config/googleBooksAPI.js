const axios = require('axios');

var buscarLivro = axios.create({
        url: 'https://www.googleapis.com/books/v1/volumes',
        baseURL: 'https://www.googleapis.com/books/v1/volumes',
        timeout: 2000,
        params: {
            key: process.env.googleBooksAPI
        },
    }
);

module.exports = buscarLivro;