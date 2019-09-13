const express = require('express');
const router = express.Router();

router.get('/contact', (req, res) => {
    let localVar = {
        'page': 'Contact',
        'isSingle': false
    };

    res.render('contact', localVar)
})

module.exports = router;