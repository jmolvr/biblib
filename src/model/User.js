const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys');
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        googleID:{
            type: String,
            select: false,
        },
        descricao: {
            type:String,
            required: false
        },
        password :{
            type: String,
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
        if(this.password == undefined) next();
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;

        next();
    });

    UserSchema.methods = {
        compareHash(hash){
            return bcrypt.compare(hash, this.password);
        },

        generateToken() {
            console.log("Estou sendo chamado");
            return jwt.sign({
                id: this.id
            }, process.env.secret || keys.jwt, {
                expiresIn: 86400
            });
        }
    }

    UserSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", UserSchema);
