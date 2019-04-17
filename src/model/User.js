const mongoose = require('mongoose');

const User = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true
        },
        descricao: {
            type:String,
            required: false
        },
    livros: [{ type: mongoose.Schema.Types.ObjectId, ref: "Livro"}]
    }
);

module.exports = mongoose.model("User", User)