var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 53142; // used to create, sign, and verify tokens
var path = require('path');
app.use(bodyParser.urlencoded({
    extended: false
}));
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json({
    limit: 1024102420,
    type: 'application/json'
}));

var fileread = require('./routes/fileread.route');
app.use('/fileread', fileread);
app.use('/', express.static(path.join(__dirname, 'public')))
var server = app.listen(port);
console.log('Server running at http://localhost:' + port);
