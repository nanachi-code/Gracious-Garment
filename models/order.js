const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
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

orderSchema.methods.getAllOrder = function (cb) {
    return this.model('Order').find({}, cb);
}

let order = mongoose.model('Order', orderSchema);

module.exports = order;