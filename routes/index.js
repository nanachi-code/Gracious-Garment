var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    //* nếu muốn truyền giá trị từ phía server về client thì thêm thuộc tính cho object localVar dưới đây rồi gọi nó ra ở trang ejs dưới dạng biến js
    //* ví dụ ở đây em muốn truyền sang header 1 chuỗi là 'Home'
    //* thì ở đây em thêm thuộc tính page, còn bên trang header.ejs em sẽ gọi nó ra là biến page
    let localVar = {
        'page': 'Home'
    };

    res.render('index.ejs', localVar)
})

module.exports = router;