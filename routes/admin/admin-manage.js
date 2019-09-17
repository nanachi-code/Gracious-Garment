const express = require('express');
const router = express.Router();
const Product = require('../../models/product');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
    extended: false
});

router.get('/admin/manage', (req, res) => {
    let localVar = {};
    //* Get all product from database
    Product
        .find({}, function (err, product) {
            if (err) {
                console.log(err);
            }
            localVar.product = product;
            res.render('admin/admin-manage', localVar);
        });
});

router.post('/admin/manage', urlencodedParser, (req, res) => {
    let localVar = {};
    console.log(req.body);
    Product
        .deleteOne(req.body, function (err, deletedProduct) {
            if (err) {
                console.log(err);
                localVar = {
                    msg: {
                        type: 'error',
                        text: err
                    }
                };
            } else {
                localVar = {
                    msg: {
                        type: 'success',
                        text: `${req.body.productName} is successfully removed`
                    }
                }
            };

            //* Get all product from database
            Product
                .find({}, function (err, product) {
                    if (err) {
                        console.log(err);
                    }
                    localVar.product = product;
                    res.render('admin/admin-manage', localVar);
                });
        })

})
module.exports = router;