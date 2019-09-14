const express = require('express');
const router = express.Router();

router.get('/address', (req, res) => {
    let localVar = {
        'page': 'CHECKOUT',
        'isSingle': false
    };

    res.render('address', localVar)
})

module.exports = router;