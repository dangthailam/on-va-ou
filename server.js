const express = require('express');
const app = express();
const path = require('path');
const routes = require('./server/routes/routes');

app.use("/node_modules", express.static(__dirname + "/node_modules"));

app.use('/api', routes);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});