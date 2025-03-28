const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password:{type: String, required: true}
});

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    quantity: {type: Number, required: true, default:0},
    price: {type: Number, required: true}
    
}, {timestamps: true});
const Person = mongoose.model("Person", personSchema);
const Product = mongoose.model("Product", productSchema);
 
module.exports = {Product, Person};