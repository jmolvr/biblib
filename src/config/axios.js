var axios = require('axios');
var keys = require('./keys');

var buscarLivro = axios.create({
        url: 'https://www.googleapis.com/books/v1/volumes',
        baseURL: 'https://www.googleapis.com/books/v1/volumes',
        params: {
            key: keys.googleBooksAPi
        },
        // transfomResponse: [(data) => {
        //     return data.data.items;
        // }]
    }
);

module.exports = buscarLivro;