const axios = require('axios');

var buscarLivro = axios.create({
        url: 'https://www.goodreads.com/search/index.xml',
        baseURL: 'https://www.goodreads.com/search/index.xml',
        params: {
            key: process.env.goodReadsAPI
        },
        transformResponse: [(data) => {
            const xml = data;
            if (data.includes('<image_url>')) {
                const image = {
                    image: {
                        image_url: xml.substring((xml.indexOf('<image_url>') + 11), xml.indexOf('</image_url>')),
                        small_image_url: xml.substring((xml.indexOf('<small_image_url>') + 17), xml.indexOf('</small_image_url>'))
                    }
                }
			    return image; 
            } else {
                const image = {   
                    image: {
                        image_url: undefined,
                        small_image_url: undefined
                    }
                }
			    return image;
            }
        }]
    }
);

module.exports = buscarLivro;