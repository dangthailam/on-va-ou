(function () {
    const express = require('express');
    const eventRouter = express.Router();
    const jwt = require('jsonwebtoken');
    const config = require('../config/config');

    const Event = require('../models/event.model');
    const User = require('../models/user.model');
    const EventType = require('../models/eventType.model');
    const Address = require('../models/address.model');

    eventRouter.use(function (req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided'
            });
        }
    });

    eventRouter.post('/', function (req, res, next) {
        User.findOne({ _id: req.decoded._id }, function (err, user) {
            if (err) return res.status(400).send({
                success: false,
                message: err
            });

            if (!user) return res.status(400).send({
                success: false,
                message: 'User not found'
            });

            res.json(user);
        });
    });

    module.exports = eventRouter;
})();