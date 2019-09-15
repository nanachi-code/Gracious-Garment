const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
    extended: false
});
const Order = require('../models/order');

router.get('/summary', (req, res) => {
    let localVar = {
        'page': 'CHECKOUT',
        'isSingle': false
    };

    res.render('summary', localVar)
})

router.post('/confirm', urlencodedParser, (req, res) => {
    console.log(req.body);

    let newOrder = new Order(req.body);
    let localVar = {};
    newOrder
        .save(function (err, order) {
            if (err) {
                console.log(err);
            } else {
                localVar = {
                    'page': 'CHECKOUT',
                    'isSingle': false
                }
            };

            res.render('confirm', localVar);
        })
})

module.exports = router;