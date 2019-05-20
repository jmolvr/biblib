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
        const { isbn } = req.body; //pega ISBN mandado no JSON
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
    
    async showBooks(req, res){
        try{
            let books = req.user.livros;
            res.json(books);
        }catch(err){
            console.log(err);
        }
    }

    async getBook(req, res){
        try{
            let {id} = req.params;
            let book = await Book.findOne({_id : id});
            res.status(200).json(book);
        }catch(err){
            console.log(err);
        }
    }

    async updateBook(req, res){
        try{
            let { id } = req.params;
            let {pagina_atual, status} = req.body;
            let book = await Book.findByIdAndUpdate(id, {
                pagina_atual: pagina_atual,
                status: status,
            },
            {
                new: true
            });
            res.json(book);
        }catch(err){
            console.log(err);
        }
    }

    async deleteBook(req, res){
        let { id } = req.params;
        await Book.findByIdAndDelete(id);
        res.status(200).json({msg: "Sucesso"});
    }
}

module.exports= new BookController();