const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
            required: true,
            select: false,
        },
        email : {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    livros: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book"}]
    });
    
    UserSchema.pre("save", async function (next) {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;

        next();
    })  

module.exports = mongoose.model("User", UserSchema);
