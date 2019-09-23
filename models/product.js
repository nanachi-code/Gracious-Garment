const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    productName: 'String',
    productPermalink: 'String',
    productPrice: 'Number',
    productCategory: 'String',
    productColor: 'String',
    productBrand: 'String',
    productBrandPermalink: 'String',
    productSize: 'String',
    productImg: 'String',
    productDoc: 'String',
    productDesc: 'String',
    productStock: 'Number'
});

let Product = mongoose.model('Product', productSchema);

module.exports = Product;