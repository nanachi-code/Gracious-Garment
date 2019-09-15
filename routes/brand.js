const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
    extended: false
});
const Product = require('../models/product');

router.get('/brand', (req, res) => {
    let localVar = {
        'page': 'All brands',
        'isSingle': false,
        'brand': {
            'name': ''
        }
    };
    Product
        .find({}, function (err, product) {
            if (err) {
                console.log(err);
            }
            localVar.product = product;
            //console.log(res);
            res.render('brand', localVar)
        });
});

// router.post('/brand', urlencodedParser, (req, res) => {
//     let localVar = {
//         'page': 'All brands',
//         'isSingle': false,
//         'brand': {
//             'name': ''
//         }
//     };

//     res.render('brand', localVar)
// });

module.exports = router;