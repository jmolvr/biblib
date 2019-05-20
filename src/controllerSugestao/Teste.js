var requestBook = require('../config/goodReads.js'); 

class Teste {

    async xmlToJson(isbn) {

        // console.log(xmlDOM);
        // Create the return object
        try {
            let a = await Teste.buscar(isbn);
            let xml = a.data;
            let bbb = xml.querySelector('image_url');
            console.log("1111111", bbb);
            return xml;
        } catch (err) {

        }
    }

    static async buscar(id) {
        try {
            let res = await requestBook({params: {q: id}});
            return res;
    
        } catch (err) {
            console.warn(err.message, err.statusText);
            return 1;
        }
    }
}

async function main() {
    livro = new Teste();
    // dados = await livro.xmlToJson('978-8576055631');
    console.log(await livro.xmlToJson('978-8576055631'));
}


main();