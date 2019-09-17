const express = require('express');
const router = express.Router();

router.get('/admin', (req, res) => {
    let localVar = {};

    res.render('admin/admin', localVar)
})

module.exports = router;