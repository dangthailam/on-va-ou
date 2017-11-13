const express = require('express');
const app = express();
const path = require('path');
const routes = require('./server/routes/routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./server/config/config');

mongoose.Promise = require('bluebird');
mongoose.connect(config.connectionString, {
    useMongoClient: true
}, function (err) {
    if (err) throw err;
    console.log('Connected to MongoDB');
});

app.use("/node_modules", express.static(__dirname + "/node_modules"));
app.use("/style", express.static(__dirname + "/client/style"));
app.use("/scripts", express.static(__dirname + "/client/scripts"));
app.use("/", express.static(__dirname + "/client/views"));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/api', routes);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});