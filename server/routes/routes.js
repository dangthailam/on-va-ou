const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user.model');

router.get('/users', function (req, res, next) {
    res.send('This is users!');
    User.find({}, function (users) {
        res.json(users);
    });
});

router.post('/users', function (req, res, next) {

});

module.exports = router;