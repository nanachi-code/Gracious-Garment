const express = require('express');
const router = express.Router();
const product = require('../models/product');

router.get('/product-detail', (req, res) => {
    product.find(function (err, product) {
        if (err) return console.error(err);
        console.log({
                 'product': product
        });
    })
    let localVar = {
        'page': 'Contact',
        'isSingle': false
    };

    res.render('contact', localVar)
})

module.exports = router;