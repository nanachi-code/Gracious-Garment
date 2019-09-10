var PORT = process.env.PORT || 5000;
var express = require('express');
var app = express();
var server = require("http").Server(app);
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

app.set('view engine', 'ejs');

//* Routes
app.use(express.static("public"));
app.use('/', require('./routes/index.js'));
app.set("views","./views");

// app.get('/', (req, res) => {
//     res.render('index');
// });

// app.post('/request', urlencodedParser, (req, res) => {
//     console.log(req.body);
//     res.render('request', {data: req.body});
// });

//* Start server
server.listen(PORT, console.log(`Server started on port ${PORT}`));