const express = require('express');
const router = express.Router();
const Order = require('../../models/order');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
    extended: false
});

router.get('/admin/order', (req, res) => {
    let localVar = {
        page: 'Order'
    };
    //* Get all orders from database
    Order
        .find({})
        .exec(function (err, order) {
            if (err) {
                console.log(err);
            }

            localVar.order = order;
            res.render('admin/admin-order', localVar);
        });
});

router.post('/admin/order', urlencodedParser, (req, res) => {
    let localVar = {
        page: 'Order'
    };    

    Order
        .findOneAndUpdate(
            //* query
            {
                '_id': req.body._id,
            },
            //* condition
            {
                'status': req.body.status
            },
            //*option
            {
                useFindAndModify: false,
                new: true
            },
            //* callback
            function (err, updatedOrder) {
                if (err) {
                    console.log(err);
                    localVar.msg = {
                        type: 'error',
                        text: err
                    };
                } else {
                    localVar.msg = {
                        type: 'success',
                        text: `OrderID ${updatedOrder._id} is successfully updated`
                    }
                };
                
                //* Get all orders from database
                Order
                    .find({})
                    .exec(function (err, order) {
                        if (err) {
                            console.log(err);
                        }
    
                        localVar.order = order;
                        res.render('admin/admin-order', localVar);
                    });
            }
        )
})
module.exports = router;