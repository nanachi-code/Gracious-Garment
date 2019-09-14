const express = require('express');
const router = express.Router();

router.get('/confirm', (req, res) => {
    let localVar = {
        'page': 'CHECKOUT',
        'isSingle': false
    };

    res.render('confirm', localVar)
})

module.exports = router;