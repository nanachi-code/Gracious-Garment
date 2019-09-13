const express = require('express');
const router = express.Router();

router.get('/shipping-payment', (req, res) => {
    let localVar = {
        'page': 'CHECKOUT',
        'isSingle': false
    };

    res.render('payment', localVar)
})

module.exports = router;