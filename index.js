const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;
require('dotenv').config;
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://rishenlap:1234@cluster0.d0ctd0q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

console.log("mongo Db connected");
const personSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password:{type: String, required: true}
});
const Person = mongoose.model('Person', personSchema);

app.use(express.urlencoded({ extended: true }));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
    });
app.post('/login',async(req,res)=>{
    let user = new Person({ username: req.body.login, password: req.body.password });
    let data = await user.save();
    res.json({"login": data.username, "password": data.password});
});
app.get('/items',(req,res)=>{
    res.sendFile(__dirname + '/items.html');
    const {name} = req.query.items;

})

app.listen(PORT, function (err) {
    if (err) console.error(err);
    console.log("Server listening on PORT", PORT);
});