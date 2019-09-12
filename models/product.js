const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    productName: 'String',
    productPrice: 'Number',
    productCategory: 'String',
    productColor: 'String',
    productSize: 'String',
    productImgURL: 'String',
    productDoc: 'String',
    productDesc: 'String',
});

let Product = mongoose.model('Product', productSchema);

module.exports = Product;