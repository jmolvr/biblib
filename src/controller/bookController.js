const Book = require('../model/Book');
const User = require('../model/User');
const requestBook = require('../config/axios.js');

class BookController{
    static async buscar(id) {
        try {
            let res = await requestBook({params: {q: id}});
            return res.data.items;

        } catch (err) {
            console.log(err.message, err.statusText);
            return 1;
        }
    }      

    async registerBook(req, res){
        //cadastrar novo livro
        const isbn = req.body.isbn; //pega ISBN mandado no JSON
        const livro = await BookController.buscar(isbn);
        const id = livro[0].id;
        const user = await User.findById(req.user._id); //procura o usuário que fez a requisição 
        const book = await Book.create({ //criar novo livro
            bookID: id,
            pagina_atual: 0,
            status: 0
        });
        user.livros.push(book); //adiciona livro na lista do user
        await user.save(); //salva usuario no db 
        return res.json(book); //retorna json com book novo
    }

    async removerLivro(req, res){
        //remover Livro
    }

    async show(req, res){
        //Mostrar dados do livro
    }

    async mudarStatus(req, res){
        //mudar estado do livro
    }
}

module.exports= new BookController();