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

//* Filter on all brands page
router.post('/brand', urlencodedParser, (req, res) => {
    let localVar = {
        'page': 'Brands',
        'isSingle': false,
        'brand': {
            'permalink': '',
        }
    };

    let query = {};

    //* Price filter
    if ((req.body.minPrice != '') && (req.body.maxPrice != '')) {
        query.productPrice = {
            $gt: req.body.minPrice,
            $lt: req.body.maxPrice
        }
    } else if ((req.body.minPrice == '') && (req.body.maxPrice != '')) {
        query.productPrice = {
            $lt: req.body.maxPrice,
        }
    } else if ((req.body.maxPrice == '') && (req.body.minPrice != '')) {
        query.productPrice = {
            $gt: req.body.minPrice,
        }
    }

    //* Size filter
    if (typeof req.body.productSize === "string") {
        query.productSize = req.body.productSize;

    } else if (typeof req.body.productSize === "object") {
        query.productSize = {
            $in: req.body.productSize
        };
    }

    //* Color filter
    if (typeof req.body.productColor === "string") {
        query.productColor = req.body.productColor;
    } else if (typeof req.body.productColor === "object") {
        query.productColor = {
            $in: req.body.productColor
        };
    }

    Product
        .find(query)
        .sort(req.body.sortPrice)
        .exec(function (err, product) {
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
            localVar.product = product;
            localVar.brand.name = product[0].productBrand;
            localVar.brand.permalink = product[0].productBrandPermalink;
            res.render('brand', localVar);
        });
});

//* Filter on specific brand page
router.post('/brand/:productBrandPermalink', urlencodedParser, (req, res) => {
    let localVar = {
        'page': 'Brands',
        'isSingle': false,
        'brand': {
            'permalink': req.params.productBrandPermalink
        }
    };

    let query = {
        'productBrandPermalink': req.params.productBrandPermalink,
    };

    //* Price filter
    if ((req.body.minPrice != '') && (req.body.maxPrice != '')) {
        query.productPrice = {
            $gt: req.body.minPrice,
            $lt: req.body.maxPrice
        }
    } else if ((req.body.minPrice == '') && (req.body.maxPrice != '')) {
        query.productPrice = {
            $lt: req.body.maxPrice,
        }
    } else if ((req.body.maxPrice == '') && (req.body.minPrice != '')) {
        query.productPrice = {
            $gt: req.body.minPrice,
        }
    }

    //* Size filter
    if (typeof req.body.productSize === "string") {
        query.productSize = req.body.productSize;

    } else if (typeof req.body.productSize === "object") {
        query.productSize = {
            $in: req.body.productSize
        };
    }

    //* Color filter
    if (typeof req.body.productColor === "string") {
        query.productColor = req.body.productColor;
    } else if (typeof req.body.productColor === "object") {
        query.productColor = {
            $in: req.body.productColor
        };
    }
    Product
        .find(query)
        .sort(req.body.sortPrice)
        .exec(function (err, product) {
            if (err) {
                console.log(err);
            }

            localVar.product = product;

            res.render('brand', localVar);
        });
});
module.exports = router;