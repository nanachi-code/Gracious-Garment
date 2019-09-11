const mongoose = require('mongoose');
const Product = new mongoose.Schema({
    name: 'String',
    price: 'Number',
    category: 'String',
    color: 'String',
    size: 'String',
    imgURL: 'String',
    docURL: 'String',
    description: 'String',
});

module.exports = Product;