// server/routes/orders.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/order');

router.post('/', auth, async (req, res) => {
  const { orderItems, shippingAddress, totalPrice } = req.body;
  if (!orderItems || orderItems.length === 0) return res.status(400).json({ message:'No items' });
  const order = new Order({ user: req.user.id, orderItems, shippingAddress, totalPrice });
  await order.save();
  res.json(order);
});

// get orders: admin sees all, user sees own
router.get('/', auth, async (req,res) => {
  if (req.user.isAdmin) {
    const orders = await Order.find({}).populate('user', 'name email');
    return res.json(orders);
  }
  const orders = await Order.find({ user: req.user.id }).populate('orderItems.product', 'name price image');
  res.json(orders);
});

module.exports = router;
