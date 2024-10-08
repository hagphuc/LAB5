var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const Product = require('./models/product');

var app = express();
var port = 3000

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://caohoangngocphuc:086549@cluster0.pqrnm.mongodb.net/LAB5')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/', usersRouter);

let cart = [];

app.get('/product/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.render('product', { product: product });
    } else {
      res.status(404).send('Product not found');
    }
  } catch (err) {
    res.status(500).send('Error retrieving product');
  }
});

app.get('/list-product', async (req, res) => {
  try {
    const products = await Product.find();
    res.render('list-product', { products: products });
  } catch (err) {
    res.status(500).send('Error retrieving products');
  }
});

app.post('/shopping-cart', async (req, res) => {
  const productId = req.body.productId;
  try {
    const product = await Product.findById(productId);
    if (product) {
      cart.push(product);
      res.send('<script>window.history.back();</script>');
    } else {
      res.status(404).send('Product not found');
    }
  } catch (err) {
    res.status(500).send('Error adding to cart');
  }
});


app.get('/shopping-cart', (req, res) => {
  res.render('shopping-cart', { cart: cart });
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:3000/`);
});
module.exports = app;
