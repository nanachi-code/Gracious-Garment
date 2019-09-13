const express = require('express');
const router = express.Router();

router.get('/contact', (req, res) => {
    let localVar = {
        'page': 'Contact',
        'isSingle': false
    };

    res.render('single.ejs', localVar)
})

module.exports = router;