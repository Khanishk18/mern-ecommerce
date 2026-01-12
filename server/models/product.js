// server/models/Product.js
const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,   // store image URL for simplicity
  category: String,
  sizes: [String],
  countInStock: { type:Number, default:0 }
}, { timestamps:true });
module.exports = mongoose.model('Product', ProductSchema);
