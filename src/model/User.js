const mongoose = require('mongoose');
const 
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        descricao: {
            type:String,
            required: false
        },
        password :{
            type: String,
        },
        email : {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
        },
    livros: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book"}]
    });
    
    UserSchema.pre("save", async function hashPassword(next){
        //criptografar a password antes de salvar
    })

module.exports = mongoose.model("User", UserSchema);
