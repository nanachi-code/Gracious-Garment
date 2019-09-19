const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
    extended: false
});
const Product = require('../../models/product');
const url = require('url');

router.get('/admin/edit/:productPermalink', (req, res) => {
    let localVar = {
        page: 'Manage'
    };

    Product
        .findOne({
            'productPermalink': req.params.productPermalink
        })
        .exec(function (err, product) {
            if (err) {
                console.log(err);
            }

            if (req.query.success) {
                localVar.msg = {
                    type: 'success',
                    text: `${product.productName} is successfully updated`
                }
            };

            localVar.product = product;
            res.render('admin/admin-edit', localVar);
        })
})

router.post('/admin/edit/:productPermalink', urlencodedParser, (req, res) => {
    let localVar = {
        page: 'Manage'
    };
    Product
        .findOneAndUpdate(
            //* query
            {
                'productPermalink': req.params.productPermalink,
            },
            //* condition
            req.body,
            //*option
            {
                useFindAndModify: false,
                new: true
            },
            //* callback
            function (err, product) {
                if (err) {
                    console.log(err);
                    localVar = {
                        msg: {
                            type: 'error',
                            text: err
                        }
                    };
                } else {
                    localVar.msg = {
                        type: 'success',
                        text: `${product.productName} is successfully updated`
                    }
                };

                localVar.product = product;
                res.redirect(url.format({
                    pathname: '/admin/edit/' + product.productPermalink,
                    query: {
                        'success': true
                    }
                }));
            }
        )
});
module.exports = router;