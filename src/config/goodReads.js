var axios = require('axios');
var keys = require('./keys');

var buscarLivro = axios.create({
        url: 'https://www.goodreads.com/search/index.xml',
        baseURL: 'https://www.goodreads.com/search/index.xml',
        params: {
            key: keys.goodReadsAPI
        },
        // transfomResponse: [(data) => {
        //     return data.data.items;
        // }]
    }
);

module.exports = buscarLivro;