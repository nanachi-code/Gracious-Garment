const express = require('express');
const router = express.Router();

router.get('/about-us', (req, res) => {
    let localVar = {
        'page': 'About us',
        'isSingle': false
    };

    res.render('about-us', localVar)
})

module.exports = router;