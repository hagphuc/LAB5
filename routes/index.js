const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Lấy danh sách sản phẩm
router.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving products' });
  }
});

// Tạo sản phẩm mới
router.post('/api/products', async (req, res) => {
  const product = new Product({
    _id: req.body.id,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: 'Error creating product' });
  }
});

// Sửa sản phẩm
router.put('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.name = req.body.name;
    product.price = req.body.price;
    product.description = req.body.description;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: 'Error updating product' });
  }
});

// Xóa sản phẩm
router.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});


module.exports = router;
