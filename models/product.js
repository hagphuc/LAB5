const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: String,  
  name: String,
  price: String,
  description: String
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
