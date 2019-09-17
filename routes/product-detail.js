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

            localVar.product = product;

            //* Get products with same brands
            Product
                .find({
                    'productBrand': product.productBrand
                })
                .sort({
                    'productPrice': 'descending'
                })
                .exec(function (err, sameBrandProduct) {
                    if (err) {
                        console.log(err);
                    }

                    localVar.sameBrandProduct = sameBrandProduct;

                    //* Get products from different brands
                    Product
                        .find({
                            'productBrand': {
                                '$ne': product.productBrand
                            }
                        })
                        .sort({
                            'productPrice': 'descending'
                        })
                        .limit(10)
                        .exec(function (err, diffBrandProduct) {
                            if (err) {
                                console.log(err);
                            }
                            localVar.diffBrandProduct = diffBrandProduct;
                            res.render('product-detail', localVar)
                        })
                })
        })
})

module.exports = router;