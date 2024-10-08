const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Thêm sản phẩm vào giỏ hàng
router.post('/shopping-cart', async (req, res) => {
  const productId = req.body.productId;
  try {
    const product = await Product.findById(productId);
    if (product) {
      let cart = req.cookies.cart || [];
      cart.push(product);
      res.cookie('cart', cart, { maxAge: 900000, httpOnly: true });
      res.send('<script>window.history.back();</script>'); 
    } else {
      res.status(404).send('Product not found');
    }
  } catch (err) {
    res.status(500).send('Error adding to cart');
  }
});

// Hiển thị giỏ hàng
router.get('/shopping-cart', (req, res) => {
  const cart = req.cookies.cart || [];
  console.log(cart)
  res.render('shopping-cart', { cart: cart });
});

module.exports = router;