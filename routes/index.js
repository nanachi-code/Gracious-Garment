const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', (req, res) => {
    let localVar = {
        'page': 'Home',
        'isSingle': false
    };

    Product
        .find({})
        .limit(10)
        .exec(function (err, latestProduct) {
            if (err) {
                console.log(err);
            }
            localVar.latestProduct = latestProduct;
            res.render('index', localVar)
        });
})

module.exports = router;