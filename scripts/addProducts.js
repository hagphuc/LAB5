const mongoose = require('mongoose');
const Product = require('../models/product'); // Đường dẫn tới model sản phẩm

mongoose.connect('mongodb+srv://caohoangngocphuc:086549@cluster0.pqrnm.mongodb.net/LAB5')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const products = [
  { _id: '1', name: 'Amazing Product 1', price: '$99.99', description: 'This is an amazing product with fantastic features.' },
  { _id: '2', name: 'Amazing Product 2', price: '$199.99', description: 'This is an amazing product with fantastic features.' },
  { _id: '3', name: 'Amazing Product 3', price: '$299.99', description: 'This is an amazing product with fantastic features.' }
];

Product.insertMany(products)
  .then(() => {
    console.log('Products added successfully');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Failed to add products', err);
    mongoose.connection.close();
  });
