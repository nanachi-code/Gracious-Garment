const express = require('express');
const router = express.Router();
const Order = require('../../models/order');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
    extended: false
});

router.get('/admin/order', (req, res) => {
    let localVar = {
        page: 'Order'
    };
    //* Get all orders from database
    Order
        .find({})
        .exec(function (err, order) {
            if (err) {
                console.log(err);
            }

            localVar.order = order;
            res.render('admin/admin-order', localVar);
        });
});

module.exports = router;