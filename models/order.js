const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    billingName: 'String',
    billingAddress: 'String',
    billingPhone: 'String',
    deliveryName: 'String',
    deliveryAddress: 'String',
    deliveryPhone: 'String',
    comment: 'String',
    product: 'Array',
    payment: 'String',
    shipping: 'String',
    totalPrice: 'Number'
});

let Order = mongoose.model('Order', orderSchema);

module.exports = Order;