const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
    {
        bookID:{
            type:String,
            required:true,
        },
        pagina_atual: {
            type: Integer,
            required: true
        },
        status:{
            type: Integer,
            required: true,
        }, 
    }
);

module.exports = mongoose.model("Book", BookSchema);