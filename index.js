const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;
require('dotenv').config;

console.log("mongo Db connected");

app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
    });
app.post('/login',(req,res)=>{
    res.json({"login": req.body.login, "password": req.body.password});
});
app.listen(PORT, function (err) {
    if (err) console.error(err);
    console.log("Server listening on PORT", PORT);
});