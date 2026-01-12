// server/routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const auth = require('../middleware/auth');

// get all products
router.get('/', async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// get product by id
router.get('/:id', async (req,res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
});

// create product (admin)
router.post('/', auth, async (req,res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message:'Not allowed' });
  const p = new Product(req.body);
  await p.save();
  res.json(p);
});

// update & delete similar pattern (auth + isAdmin)
router.put('/:id', auth, async (req,res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message:'Not allowed' });
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new:true });
  res.json(product);
});

router.delete('/:id', auth, async (req,res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message:'Not allowed' });
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message:'Deleted' });
});

module.exports = router;
