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
                    let author = livro[0].volumeInfo.authors;
                    random = Math.floor((Math.random() * author.length));
                    let aux = await Sugestao.buscar(author[random]);
                    do {                        
                        random = Math.floor((Math.random() * aux.length));
                        const teste = encontros.books.findIndex( (data) => {
                            return data.id.indexOf(aux[random].id) !== -1;
                        });
                        if (teste === -1 && aux[random].volumeInfo.language === "pt") {
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
                                coverURL = temp.data;
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
                    } while (true);
                } else {
                    return res.status(400).json({msg: "1 Erro ao gerar sugestão"});
                }
            }
            return res.json(encontros);
        } catch(err) {
            res.status(400).json({msg: "2 Erro ao gerar sugestão"});
        }
    }

    static async buscar(id) {
        try {
            let res = await requestBook({params: {q: id}});
            return res.data.items;
    
        } catch (err) {
            return res.status(400).json({msg: "Livro não encontrado"});
        }
    } 
}

module.exports = new Sugestao();