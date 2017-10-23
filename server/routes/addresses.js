(function () {
    const express = require('express');
    const addressRouter = express.Router();
    const Address = require('../models/address.model');

    addressRouter.get('/', (req, res, next) => {
        Address.find({}, (err, addresses) => {
            if (err) return res.status(400).send({
                success: false,
                message: err
            });

            res.json(addresses);
        });
    });

    addressRouter.post('/', (req, res, next) => {
        Address.find({ googlePlaceId: req.body.googlePlaceId }, (err, addresses) => {
            if (err) return res.status(400).send({
                success: false,
                message: err
            });

            if (addresses && addresses.length > 0) return res.status(400).send({
                success: false,
                message: "This address had been created"
            });

            let newAddress = Address({
                googlePlaceId: req.body.googlePlaceId
            });

            newAddress.save().then((address) => {
                res.status(201).json(address);
            }).catch((err) => {
                res.status(400).send({
                    success: false,
                    message: err
                });
            });
        });
    });

    module.exports = addressRouter;
})();