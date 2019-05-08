const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
    {
        titulo: {
            type: String,
            required: true,
        },
        autor: {
            type: String,
        },
        paginas: {
            type: Integer,
        },
        pagina_atual: {
            type: Integer,
            required: true
        },
        status:{
            type: Integer,
            required: true,
        },
        img: {
            type: String,
        },

        ISBN: {
            type: String,
        }
    }
);

module.exports = mongoose.model("Book", BookSchema);