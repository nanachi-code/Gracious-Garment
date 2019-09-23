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
    let reqDecoded = JSON.parse(req.body.cartOptions);
    reqDecoded.status = 'Pending';
    let newOrder = new Order(reqDecoded);
    
    let localVar = {
        'page': 'CHECKOUT',
        'isSingle': false
    };
    newOrder
        .save(function (err, order) {
            if (err) {
                console.log(err)
            }

            res.render('confirm', localVar);
        })
})

module.exports = router;