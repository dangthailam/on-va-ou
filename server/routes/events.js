(function () {
    const express = require('express');
    const eventRouter = express.Router();
    const jwt = require('jsonwebtoken');
    const config = require('../config/config');

    const Event = require('../models/event.model');
    const User = require('../models/user.model');
    const EventType = require('../models/eventType.model');
    const Address = require('../models/address.model');

    eventRouter.post('/', function (req, res, next) {
        let newEvent = Event({
            title: req.body.title,
            startedDate: req.body.startedDate,
            endedDate: req.body.endedDate,
            phone: req.body.phone,
            description: req.body.description,
            urlSite: req.body.urlSite,
            type: req.body.typeId,
            address: req.body.addressId,
            creator: req.decoded._id
        });

        newEvent.save().then((event) => {
            res.status(201).json(event);
        }).catch((err) => {
            res.status(400).send({
                success: false,
                message: err
            });
        });
    });

    eventRouter.patch('/:id', (req, res, next) => {
        Event.findById(req.params.id, (err, event) => {
            if (err) return res.status(400).send({
                success: false,
                message: err
            });

            if (!event) return res.status(404).send({
                success: false,
                message: 'Event not found'
            });

            for (let prop in req.body) {
                event[prop] = req[prop];
            }

            event.save().then((event) => {
                res.status(201).json(event);
            }).catch((err) => {
                res.status(400).send({
                    success: false,
                    message: err
                });
            });
        });
    });

    eventRouter.get('/', (req, res, next) => {
        Event.find({}).populate('creator').populate('address').populate('type').exec((err, events) => {
            if (err) return res.status(400).send({
                success: false,
                message: err
            });

            res.status(200).json(events);
        });
    });

    eventRouter.delete('/:id', (req, res, next) => {
        Event.findByIdAndRemove(req.params.id, (err, event) => {
            if (err) return res.status(400).send({
                success: false,
                message: err
            });

            if (!event) return res.status(404).send({
                success: false,
                message: 'Event not found'
            });

            res.status(200).send({
                success: true
            });
        });
    });

    module.exports = eventRouter;
})();