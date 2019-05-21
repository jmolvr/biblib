var requestBook = require('../config/googleBooksAPI'); 

class Sugestao {

    async gerarSugestao(req, res) {

        let encontros = {id: new Array()};
        for (let i = 0; i < 4; i++) {
            let random = Math.floor((Math.random() * req.user.books.length));
            let livro = await Sugestao.buscar(req.user.books[random].bookID);
            if (livro !== 1) {
                let author = livro[0].volumeInfo.authors;
                //let title = livro[0].volumeInfo.title;
                random = Math.floor((Math.random() * author.length));
                let aux = await Sugestao.buscar(author[random]);
                random = Math.floor((Math.random() * aux.length));
                if (encontros.id.indexOf(aux[random].id) === -1) {
                    encontros.id.push(aux[random].id);
                } else {
                    i--;
                }
            } else {
                console.log("err");
            }
        }
       return res.json(encontros);
    }

    static async buscar(id) {
        try {
            let res = await requestBook({params: {q: id}});
            return res.data.items;
    
        } catch (err) {
            console.log(err.message, err.statusText);
            return 1;
        }
    } 
}

module.exports = new Sugestao();