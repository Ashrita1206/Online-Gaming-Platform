const mongoose= require("mongoose");

mongoose.connect("mongodb://localhost:27017/GameUsers",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
   // useCreateIndex:true
}).then(() =>{
    console.log('connection successful2');
}).catch((error)=>{
    console.log(error.message);
})