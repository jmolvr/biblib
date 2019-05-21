const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
    {
        ownerID :{
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User"
        },
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
        comment:{
            type: String,
        } 
    },
    {
        timestamps: true,
    }
    
);

module.exports = mongoose.model("Book", BookSchema);