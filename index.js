const express = require("express");
const app = express();
const PORT = 3000;
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);
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
//read items
app.get("/api/items/:item?", async (req, res) => {
  let items;
  if (req.params.item) {
    items = await Product.findById(req.params.item);
  } else {
    items = await Product.find({});
  }

  res.json({ items: items });
});
//update items
app.put("/items/:item", async (req, res) => {
  try {
    let { item } = req.params;
    let id = await Product.findById(item);
    console.log(id);
    const update = await Product.findByIdAndUpdate(id, req.body);
    if (!update) {
      return res.status(404).json({ message: "Product no found" });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});
app.delete("/item/:item", async (req, res) => {
  try {
    let id = req.params.item;

    const del = await Product.findByIdAndDelete(id);
    if (!del) {
      return res.status(404).json({ message: "no id found" });
    }
    res.status(200).json({ message: "product deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "no deleted" });
  }
});

app.listen(PORT, function (err) {
  if (err) console.error(err);
  console.log("Server listening on PORT", PORT);
});
