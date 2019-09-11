const mongoose = require('mongoose');
const Order = new mongoose.Schema({
    customerName: 'String',
    customerAddress: 'String',
    customerPhone: 'String',
    customerComment: 'String',
    productName: 'String',
    productQuantity: 'String',
    productPayment: 'String',
    productShipping: 'String',
    productTotal: 'String',
});

module.exports = Order;