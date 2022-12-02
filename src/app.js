const express = require("express");
const path =require("path");
const app = express();
const hbs=require("hbs");
require("./db/conn");
const Register =require("./models/registers.js");
const { registerPartials } = require("hbs");

const MongoClient = require('mongodb').MongoClient

app.use(express.json())
var database
const port = process.env.PORT || 3000;
const static_path =path.join(__dirname,"../public");
const template_path =path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");
const adminDashboard = async(req,res)=>{
    try
    {
        const userdata = await Register.findOne();
        res.render('AdminPage',{Register:userdata});
    }catch(error){
        console.log(error.message);
    }
  
}
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);

app.get("/",(req,res) => {
    res.render("index")

});
app.get("/index.hbs",(req,res) => {
    res.render("index")

});
app.get("/register.hbs",(req,res)=>{
    res.render("register")
});
app.post("/GameSelectionPage.hbs",(req,res)=>{
    res.render("GameSelectionPage")
});
app.get("/Admin.hbs",(req,res)=>{
    res.render("Admin")
});
app.post("/AdminPage.hbs",async(req,res)=>{
    try
    {
        const userdata = await Register.findOne();
        res.render('AdminPage',{Register:userdata});
    }catch(error){
        console.log(error.message);
    }
    const userdata = await Register.findOne();
           database.collection("registers").find({}).toArray((error,result)=>{
            if(error){
                return res.status(500).send(error);
            }
            res.render("AdminPage",{Register:userdata});
           })
            
    
    
});
app.post("/register.hbs",async(req,res)=>{
    try{
        const gameUsers = new Register({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            password:req.body.password
          
        })
        const registered =await gameUsers.save();
        res.status(201).render("login");
        }catch(error){
        res.status(400).send(error);
        
    }
  
})


app.post("/login",async(req,res)=>{

   try{
    const email =req.body.email;
    const password =req.body.password;
    const useremail = await Register.findOne({email:email});
    if(useremail.password === password){
        res.status(201).render("GameSelectionPage");
    }
    else{
        res.send("invalid login details");
    }
    }catch(error){
        res.status(400).send("invalid login details");
    }

   
});
app.get("/login.hbs",(req,res)=>{
    res.render("login")
});

app.listen(5000,()=>{
    MongoClient.connect('mongodb://localhost:27017/',{useNewUrlParser:true},(error,result)=>
    {
     if(error)throw error
     database = result.db('GameUsers')
     console.log('connection succesful1')
    })
});

    
    
