const PORT = process.env.PORT || 5000;
const express = require('express');
const app = express();
const server = require("http").Server(app);
const mongoose = require('mongoose');
const uri = 'mongodb+srv://nanachi:dvuomega12@database-dbbcs.mongodb.net/test';

//* Connect to MongoDB Server
mongoose
    .connect(uri, {
        keepAlive: true,
        keepAliveInitialDelay: 300000,
        useNewUrlParser: true,
        retryWrites: true,
        w: 'majority'
    })
    .then(
        () => {
            console.log('MongoDB Connected');
        },
        (err) => {
            console.log(err);
        }
    );

//* Set up view engine
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set("views", "./views");

//* Routes
app.use('/', require('./routes/index.js'));
app.use('/', require('./routes/brand.js'));
app.use('/', require('./routes/product-detail.js'));
app.use('/', require('./routes/about-us.js'));
app.use('/', require('./routes/contact.js'));
app.use('/', require('./routes/admin/admin-add.js'));
app.use('/', require('./routes/cart.js'));
app.use('/', require('./routes/shipping-payment.js'));
app.use('/', require('./routes/address.js'));
app.use('/', require('./routes/summary.js'));
app.use('/', require('./routes/confirm.js'));



//* Start server
server.listen(PORT, console.log(`Server started on port ${PORT}`));