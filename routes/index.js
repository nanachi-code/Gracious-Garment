const express = require('express');
const router = express.Router();
const product = require('../models/product');

router.get('/', (req, res) => {
    //* nếu muốn truyền giá trị từ phía server về client thì thêm thuộc tính cho object localVar dưới đây rồi gọi nó ra ở trang ejs dưới dạng biến js
    //* ví dụ ở đây em muốn truyền sang header tên trang hiện tại là 'Home'
    //* thì ở đây em thêm thuộc tính page, còn bên trang header.ejs em sẽ gọi nó ra là biến page
    product.find(function (err, product) {
        if (err) return console.error(err);
        console.log({
            'product': product
        });
    })
    let localVar = {
        'page': 'Home',
        'isSingle': false
    };

    res.render('index.ejs', localVar)
})

module.exports = router;