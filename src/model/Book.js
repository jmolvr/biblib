const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
    {
        bookID:{
            type:String,
            required:true,
        },
        pagina_atual: {
            type: Number,
            required: true
        },
        status:{
            type: Number,
            required: true,
        }, 
    }
);

module.exports = mongoose.model("Book", BookSchema);