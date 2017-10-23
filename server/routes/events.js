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
            time: req.body.time,
            duration: req.body.duration,
            phone: req.body.phone,
            description: req.body.description,
            urlSite: req.body.urlSite,
            type: req.body.typeId,
            address: req.body.addressId,
            creator: req.body.creatorId
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

    eventRouter.get('/', (req, res, next) => {
        Event.find({}, (err, events) => {
            if(err) return res.status(400).send({
                success: false,
                message: 'Error'
            });

            res.status(200).json(events);
        });
    });

    module.exports = eventRouter;
})();