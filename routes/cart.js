const express = require('express');
const router = express.Router();

router.get('/cart', (req, res) => {
    let localVar = {
        'page': 'Cart',
        'isSingle': false
    };

    res.render('cart', localVar)
})

module.exports = router;