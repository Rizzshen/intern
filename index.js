const express = require("express");
const app = express();
const PORT = 3000;
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGO_URI
);
console.log("mongo Db connected");
const { Person, Product } = require("./product.model.js");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/login", async (req, res) => {
  let user = new Person({
    username: req.body.login,
    password: req.body.password,
  });
  let data = await user.save();
  res.json({ login: data.username, password: data.password });
});
app.get("/items", (req, res) => {
  res.sendFile(__dirname + "/items.html");
});
//create items
app.post("/items", async (req, res) => {
  try {
    console.log(req.body);
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
//search items
app.get("/api/items/:item?", async (req, res) => {
    let items;
    if(req.params.item){
        items = await Product.findById(req.params.item);
    }
    else{
        items = await Product.find({});
    }
  
    res.json({ items: items });
});

app.listen(PORT, function (err) {
  if (err) console.error(err);
  console.log("Server listening on PORT", PORT);
});
