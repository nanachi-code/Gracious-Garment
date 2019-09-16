const express = require('express');
const router = express.Router();
const Product = require('../../models/product');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
    extended: false
});

router.get('/admin/list', (req, res) => {
    let localVar = {};
    Product
        .find({}, function (err, product) {
            if (err) {
                console.log(err);
            }
            localVar.product = product;
            res.render('admin/admin-list', localVar);
        });
});

module.exports = router;