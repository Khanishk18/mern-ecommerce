// server/models/Order.js
const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
  orderItems: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref:'Product' },
    name: String, qty: Number, price: Number
  }],
  shippingAddress: String,
  totalPrice: Number,
  isPaid: { type:Boolean, default:false },
}, { timestamps:true });
module.exports = mongoose.model('Order', OrderSchema);
