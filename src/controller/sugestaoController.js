const requestBook = require('../config/googleBooksAPI');
const requestCover = require('../config/goodReadsAPI');

class Sugestao {

    async gerarSugestao(req, res) {
        try {
            let encontros = {books: new Array()};
            for (let i = 0; i < 4; i++) {
                let random = Math.floor((Math.random() * req.user.books.length));
                let livro = await Sugestao.buscar(req.user.books[random].bookID);
                if (livro !== undefined) {
                    let parametro;
                    parametro = livro[0].volumeInfo.authors;
                    if (parametro == undefined) {
                        continue;
                    }
                    random = Math.floor((Math.random() * parametro.length));
                    let aux = await Sugestao.buscar(parametro[random]);
                    let controle = 0;
                    if (aux == undefined) {
                        continue;
                    }
                    do {                        
                        random = Math.floor((Math.random() * aux.length));
                        const teste = encontros.books.findIndex( (data) => {
                            return data.id.indexOf(aux[random].id) !== -1;
                        });
                        if (teste === -1) {
                            let coverURL;
                            if (aux[random].volumeInfo.imageLinks == undefined) {
                                let temp;
                                for (let a of aux[random].volumeInfo.industryIdentifiers) {
                                    temp = await requestCover({ params: { q : a.identifier }});
                                    if (temp != undefined) {
                                        break;
                                    }
                                }
                                if (temp == undefined) {
                                    console.warn("Erro ao encontrar isbn");
                                    break;
                                }
                                if (temp.image == undefined) {
                                    coverURL = {
                                            image: {
                                            image_url: "https://cdn.discordapp.com/attachments/549765199968600069/584156996316692500/splash.png",
                                            small_image_url: "https://cdn.discordapp.com/attachments/549765199968600069/584156996316692500/splash.png"
                                        }
                                    }
                                } else {
                                    coverURL = temp.data;
                                }
                            } else {
                                coverURL = {   
                                    image: {
                                        image_url: aux[random].volumeInfo.imageLinks.thumbnail,
                                        small_image_url: aux[random].volumeInfo.imageLinks.smallThumbnail
                                    }
                                };
                            }
                            encontros.books.push(
                                {
                                    id: aux[random].id,
                                    title: aux[random].volumeInfo.title,
                                    subtitle: aux[random].volumeInfo.subtitle,
                                    authors: aux[random].volumeInfo.authors,
                                    publisher: aux[random].volumeInfo.publisher,
                                    description: aux[random].volumeInfo.description,
                                    pageCount: aux[random].volumeInfo.pageCount,
                                    coverLarge: coverURL.image.image_url,
                                    coverSmall: coverURL.image.small_image_url
                                }
                            );
                            break;
                        }
                        controle++;
                    } while (controle < 4);
                } else {
                    console.warn("Livro não encontrado");
                }
            }
            return res.json(encontros);
        } catch(err) {
            res.status(400).json(err.message);
        }
    }

    static async buscar(id) {
        try {
            let resposta = undefined; 
            resposta = await requestBook({params: {q: id}});
            if (resposta != undefined) {
                return resposta.data.items;
            } else {
                return undefined;
            }    
        } catch (err) {
            console.warn("Livro não encontrado");
        }
    } 
}

module.exports = new Sugestao();