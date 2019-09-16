const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
    extended: false
});
const Product = require('../models/product');

router.get('/product/:productPermalink', (req, res) => {
    let localVar = {
        'page': 'Product',
        'isSingle': true,
    };

    Product
        .findOne({
            'productPermalink': req.params.productPermalink
        })
        .exec(function (err, product) {
            if (err) {
                console.log(err);
            }
            console.log(product);
            
            localVar.product = product;
            res.render('product-detail', localVar)
        })
})

module.exports = router;