const express = require('express');
const router = express.Router();
const Order = require('../../models/order');
const Product = require('../../models/product');
router.get('/admin', (req, res) => {
    let localVar = {
        page: 'Dashboard'
    };

    Order
        .find({})
        .countDocuments(function (err, countOrder) {
            if (err) {
                console.log(err);
            }

            localVar.countOrder = countOrder;

            Product
            .find({})
            .countDocuments(function (err, countProduct) {
                if (err) {
                    console.log(err);
                }
                
                localVar.countProduct = countProduct;

                res.render('admin/admin', localVar)
            })
        })
})

module.exports = router;