const express = require('express');
const router = express.Router();
const Order = require('../../models/order');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
    extended: false
});

router.get('/admin/order', (req, res) => {
    let localVar = {};
    //* Get all orders from database
    Order
        .find({}, function (err, order) {
            if (err) {
                console.log(err);
            }
            
            console.log((order[0].product[0]));

            localVar.order = order;
            res.render('admin/admin-order', localVar);
        });
});

module.exports = router;