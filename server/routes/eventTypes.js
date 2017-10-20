(function () {
    const express = require('express');
    const eventTypeRouter = express.Router();
    const EventType = require('../models/eventType.model');

    eventTypeRouter.post('/', function (req, res, next) {
        if (req.decoded.role !== 'admin') {
            return res.status(401).send({
                success: false,
                message: 'Not authorized'
            });
        }

        let eventType = EventType({
            type: req.body.type
        });

        eventType.save().then(function (et) {
            res.status(201).json(et);
        }).catch(function (err) {
            res.status(400).send({
                success: true,
                message: err
            });
        });
    });

    module.exports = eventTypeRouter;
})();