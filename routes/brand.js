const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
    extended: false
});
const Product = require('../models/product');

//* Display all brands
router.get('/brand', (req, res) => {
    let localVar = {
        'page': 'Brands',
        'isSingle': false,
        'brand': {
            'name': '',
            'permalink': '',
        }
    };
    Product
        .find({}, function (err, product) {
            if (err) {
                console.log(err);
            }
            localVar.product = product;
            res.render('brand', localVar);
        });
});

router.post('/brand', urlencodedParser, (req, res) => {
    let localVar = {
        'page': 'Brands',
        'isSingle': false,
        'brand': {
            'name': '',
            'permalink': '',
        }
    };

    Product
        .find({})
        .where('productPrice').gt(req.body.minPrice).lt(req.body.maxPrice)
        .where('productSize').in(req.body.productSize)
        .where('productColor').in(req.body.productColor)
        .sort(req.body.sortPrice)
        .exec(function (err, product) {
            console.log(product);
            if (err) {
                console.log(err);
            }

            localVar.product = product;
            res.render('brand', localVar);
        });
});

//* Display a specific brand
router.get('/brand/:productBrandPermalink', (req, res) => {
    let localVar = {
        'page': 'Brands',
        'isSingle': false,
        'brand': {}
    };
    Product
        .find({
            'productBrandPermalink': req.params.productBrandPermalink
        })
        .exec(function (err, product) {
            if (err) {
                console.log(err);
            }
            console.log(product);
            localVar.product = product;
            localVar.brand.name = product[0].productBrand;
            localVar.brand.permalink = product[0].productBrandPermalink;
            res.render('brand', localVar);
        });
});

router.post('/brand/:productBrandPermalink', urlencodedParser, (req, res) => {
    let localVar = {
        'page': 'Brands',
        'isSingle': false,
        'brand': {}
    };
    Product
        .find({
            'productBrandPermalink': req.params.productBrandPermalink
        })
        .where('productPrice').gt(req.body.minPrice).lt(req.body.maxPrice)
        .where('productSize').in(req.body.productSize)
        .where('productColor').in(req.body.productColor)
        .sort(req.body.sortPrice)
        .exec(function (err, product) {
            if (err) {
                console.log(err);
            }
            console.log(product);
            localVar.product = product;
            localVar.brand.name = product[0].productBrand;
            localVar.brand.permalink = product[0].productBrandPermalink;
            res.render('brand', localVar);
        });
});
module.exports = router;