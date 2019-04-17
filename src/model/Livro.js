const mongoose = require("mongoose");

const Livro = new mongoose.Schema(
    {
        titulo: {
            type: String,
            required: true
        }
    }
);