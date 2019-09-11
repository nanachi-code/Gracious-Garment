const PORT = process.env.PORT || 5000;
const express = require('express');
const app = express();
const server = require("http").Server(app);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const urlencodedParser = bodyParser.urlencoded({
    extended: false
});

//* Connect to MongoDB Server
mongoose.connect(uri, {
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    useNewUrlParser: true
});

//* Set up view engine
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.set("views","./views");

//* Routes
app.use('/', require('./routes/index.js'));

//* Start server
server.listen(PORT, console.log(`Server started on port ${PORT}`));