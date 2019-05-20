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
        const googleID = livro[0].id;
        const user = await User.findById(req.user._id); //procura o usuário que fez a requisição 
        const book = await Book.create({ //criar novo livro
            ownerID: req.user._id,
            bookID: googleID,
            pagina_atual: 0,
            status: 0
        });
        user.livros.push(book); //adiciona livro na lista do user
        await user.save(); //salva usuario no db 
        book.ownerID = undefined;
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
            let book = await Book.findOne({_id : id, ownerID: req.user._id});
            if(!book){
                return res.sendStatus(401);
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
                return res.sendStatus(401);
            }
            res.json(book);
        }catch(err){
            console.log(err);
        }
    }

    async deleteBook(req, res){
        let { id } = req.params;
        let book = await Book.findOneAndDelete({_id: id, ownerID: req.user._id});
        console.log(book);
        if(book ==  null){
            return res.sendStatus(401);
        }
        return res.status(200).json({msg: "Sucesso"});
    }
}

module.exports= new BookController();