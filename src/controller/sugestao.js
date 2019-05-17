var requestBook = require('../config/axios.js'); 

class Sugestao {

    async gerarSugestao(req, res) {
    //    let id = ['NjUQCwAAQBAJ', 'JMKbBAAAQBAJ', 'I1wR6d_HO1AC'];
        let encontros = {id: new Array()};
        for (let i = 0; i < 4; i++) {
            let random = Math.floor((Math.random() * res.livros.length));
            let livro = await Sugestao.buscar(res.livros[random]);
            if (livro !== 1) {
                let author = livro[0].volumeInfo.authors;
                let title = livro[0].volumeInfo.title;
                random = Math.floor((Math.random() * author.length));
                let aux = await Sugestao.buscar(author[random]);
                random = Math.floor((Math.random() * aux.length));
                if (encontros.id.indexOf(aux[random].id) === -1) {
                    encontros.id.push(aux[random].id);
                } else {
                    i--;
                }
            } else {
                //erro
            }
        }
        console.log(encontros);
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

// function main() {
//     // harry potter, java para leigos, as cronicas de narnia
//     livrosSugeridos = Sugestao.gerarSugestao();
//     // console.log(livrosSugeridos);
// }


// main();

module.exports = new Sugestao();