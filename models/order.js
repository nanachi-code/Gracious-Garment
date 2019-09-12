const mongoose = require('mongoose');
const Order = new mongoose.Schema({
    billingName: 'String',
    billingAddress: 'String',
    billingPhone: 'String',
    deliveryName: 'String',
    deliverAddress: 'String',
    deliverPhone: 'String',
    comment: 'String',
    productName: 'String',
    productQuantity: 'String',
    productPayment: 'String',
    productShipping: 'String',
    productTotal: 'String',
});

module.exports = Order;