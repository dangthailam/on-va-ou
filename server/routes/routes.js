(function () {
    const express = require('express');
    const router = express.Router();
    const jwt = require('jsonwebtoken');
    const config = require('../config/config');

    const userRouter = require('./users');
    const eventRouter = require('./events');
    const authenticationRouter = require('./authentication');
    const eventTypeRouter = require('./eventTypes');
    const addressRouter = require('./addresses');


    router.use(function (req, res, next) {
        if (req.originalUrl === '/api/token') {
            return next();
        }

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

    router.use('/users', userRouter);
    router.use('/events', eventRouter);
    router.use('/token', authenticationRouter);
    router.use('/eventtypes', eventTypeRouter);
    router.use('/addresses', addressRouter);
    

    module.exports = router;
})();