const express = require('express');
const router = express.Router();

router.get('/summary', (req, res) => {
    let localVar = {
        'page': 'CHECKOUT',
        'isSingle': false
    };

    res.render('summary', localVar)
})

module.exports = router;