var requestBook = require('./axios.js'); 

class Sugestao {
    constructor() {
        this.encontros = new Array();
    }

    static async gerarSugestao(id) {
        let livro = await this.buscar(id);
        if (livro !== 1) {
            let author = livro.data.items[0].volumeInfo.authors;
            let title = livro.data.items[0].volumeInfo.title;
            let random = Math.floor((Math.random() * author.length));
            let aux = await requestBook({params: {q: author[random]}});
            random = Math.floor((Math.random() * aux.data.items.length));
            console.log('Sugestao', aux.data.items[random].volumeInfo);
            return aux.data.items[random].id;
        }   else {
            //erro
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

function main() {
    livrosSugeridos = Sugestao.gerarSugestao('NjUQCwAAQBAJ');
}


main();