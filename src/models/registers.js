const mongoose =require("mongoose")
const gameUsers = new mongoose.Schema({
    firstname:{
        type:String,
        required :true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    score:{
        type:Number,
        

    }

})
const Register = new mongoose.model("Register",gameUsers);
module.exports=Register;