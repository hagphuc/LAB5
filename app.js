var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var port = 3000

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
const products = [
    { id: 1, name: 'Amazing Product 1', price: '$99.99', description: 'This is an amazing product 1 with fantastic features.' },
    { id: 2, name: 'Amazing Product 2', price: '$199.99', description: 'This is an amazing product 2 with fantastic features.' },
    { id: 3, name: 'Amazing Product 3', price: '$299.99', description: 'This is an amazing product 3 with fantastic features.' }
  ];
  
  let cart = [];
app.get('/product/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (product) {
      res.render('product', { product: product });
    } else {
      res.status(404).send('Product not found');
    }
});
  
app.get('/list-product', (req, res) => {
    res.render('list-product', { products: products });
});
  
app.post('/shopping-cart', (req, res) => {
    const productId = req.body.productId;
    const product = products.find(p => p.id == productId);
    if (product) {
      cart.push(product);
      res.send('<script>window.history.back();</script>');
    } else {
      res.status(404).send('Product not found');
    }
});
  
app.get('/shopping-cart', (req, res) => {
    res.render('shopping-cart', { cart: cart });
});
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
