const Book = require('../model/Book');
const User = require('../model/User');
const requestBook = require('../config/googleBooksAPI');
const requestCover = require('../config/goodReadsAPI');


class BookController{
    static async buscar(isbn) {
        try {
            let res = await requestBook({params: {q: isbn}});
            return res.data.items;
        } catch (err) {
            console.log(err.message, err.statusText);
            return 1;
        }
    }

    static async getCapa(isbn) {
        try {
            const urlCover = await requestCover({params: {q: isbn}});
            return urlCover.data;
        } catch (err) {
            console.warn('erro capa', err.message, err.statusText); 
        }
    }       

    async registerBook(req, res){
       try{
            const user = req.user; //resgata user que fez a req
            const {
                isbn
            } = req.body; //pega ISBN da req
            const existeLivro = await Book.findOne({
                bookID: isbn,
                ownerID: user._id
            });
            if (existeLivro) {
                existeLivro.ownerID = undefined;
                return res.json(existeLivro);
            }
            const livro = await BookController.buscar(isbn);
            if (!livro) return res.status(400).json({
                msg: "Livro não encontrado"
            });
            let coverURL;
            if (livro[0].volumeInfo.imageLinks == undefined) {
                coverURL = await BookController.getCapa(isbn);
            } else {
                coverURL = {   
                    image: {
                        image_url: livro[0].volumeInfo.imageLinks.thumbnail,
                        small_image_url: livro[0].volumeInfo.imageLinks.smallThumbnail
                    }
                };
            }
            //cria novo livro
            const book = await Book.create({
                ownerID: user._id,
                bookID: isbn,
                pagina_atual: 0,
                status: 0,
                coverLarge: coverURL.image.image_url,
                coverSmall: coverURL.image.small_image_url,
            });
            user.books.push(book); //adiciona livro na lista do user
            await user.save(); //salva usuario no db com novo livro
            book.ownerID = undefined; // retira a informação do id do dono do livro
            return res.json(book); //retorna json com novo livro
       }catch(err){
           console.log(err);
       } 

    }
    
    async showBooks(req, res){
        try{
            let books = req.user.books; //pega todos os livros do user
            res.json(books); //e devolve a lista como resposta
        }catch(err){
            console.log(err);
        }
    }

    async getBook(req, res){
        try{
            let { id } = req.params; //pega id do livro requisitado
            //procura o livro e verifica se pertecence ao user atual
            let book = await Book.findOne({_id : id, ownerID: req.user._id});
            if(!book){
                return res.sendStatus(400);
            }
            return res.json(book);
        }catch(err){
            console.log(err);
        }
    }

    async updateBook(req, res){
        try{
            let { id } = req.params;
            let {pagina_atual, status} = req.body;
            let book = await Book.findOneAndUpdate({_id: id, ownerID: req.user._id}, {
                pagina_atual: pagina_atual,
                status: status,
            },
            {
                new: true
            });
            if(!book){
                return res.sendStatus(400);
            }
            res.json(book);
        }catch(err){
            console.log(err);
        }
    }

    async deleteBook(req, res){
        let { id } = req.params;
        let book = await Book.findOneAndDelete({_id: id, ownerID: req.user._id});
        if(book ==  null){
            return res.sendStatus(400);
        }
        return res.sendStatus(200);
    }
}

module.exports= new BookController();