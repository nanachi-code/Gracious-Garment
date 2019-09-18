const express = require('express');
const router = express.Router();
const Product = require('../../models/product');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
    extended: false
});

router.get('/admin/add', (req, res) => {
    let localVar = {
        page: 'Add'
    };

    res.render('admin/admin-add', localVar);
});

router.post('/admin/add', urlencodedParser, (req, res) => {
    console.log(req.body);
    //* Create new product instance
    let newProduct = new Product(req.body);
    let localVar = {
        page: 'Add'
    };
    newProduct
        .save(function (err, product) {
            console.log(product);

            if (err) {
                console.log(err);
                localVar.msg = {
                    type: 'error',
                    text: err
                };
            } else {
                localVar.msg = {
                    type: 'success',
                    text: `${product.productName} is successfully added to database`
                }
            };


            res.render('admin/admin-add', localVar);
        })
});

module.exports = router;