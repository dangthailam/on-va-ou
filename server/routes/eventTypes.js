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

        EventType.find({ type: req.body.type }, (err, types) => {
            if (err) return res.status(400).send({
                success: false,
                message: 'Error'
            });

            if (types && types.length > 0) return res.status(400).send({
                success: false,
                message: 'This type had been created'
            });

            let eventType = EventType({
                type: req.body.type
            });

            eventType.save().then((et) => {
                res.status(201).json(et);
            }).catch((err) => {
                res.status(400).send({
                    success: true,
                    message: err
                });
            });
        });
    });

    eventTypeRouter.get('/', (req, res, next) => {
        EventType.find({}, (err, types) => {
            if (err) return res.status(400).send({
                success: false,
                message: 'Error'
            });

            res.json(types);
        });
    });

    eventTypeRouter.get('/:id', (req, res, next) => {
        EventType.findById(req.params.id, (err, type) => {
            if (err) return res.status(400).send({
                success: false,
                message: 'Error'
            });

            res.json(type);
        });
    });

    eventTypeRouter.delete('/:id', (req, res, next) => {
        EventType.findByIdAndRemove(req.params.id, (err, eventType) => {
            if (err) return res.status(400).send({
                success: false,
                message: 'Error'
            });

            if(!eventType) return res.status(400).send({
                success: false,
                message: 'This event type did not exist'
            });

            res.status(200).send({
                success: true,
                message: eventType._id + " successfully deleted"
            });
        });
    });

    module.exports = eventTypeRouter;
})();