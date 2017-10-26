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

    addressRouter.put('/:id', (req, res, next) => {
        Address.findById(req.params.id, (err, address) => {
            if (err) return res.status(400).send({
                success: false,
                message: err
            });

            if (!address) return res.status(404).send({
                success: false,
                message: 'Address not found'
            });

            address.googlePlaceId = req.body.googlePlaceId;

            address.save().then((address) => {
                res.status(200).json(address);
            }).catch((err) => {
                res.status(400).send({
                    success: false,
                    message: err
                });
            });
        });
    });

    addressRouter.delete('/:id', (req, res, next) => {
        Address.findByIdAndRemove(req.params.id, (err, address) => {
            if(err) return res.status(400).send({
                success: false,
                message: err
            });

            if(!address) return res.status(404).send({
                success: false,
                message: 'Address not found'
            });

            res.status(200).send({
                success: true
            });
        });
    });

    module.exports = addressRouter;
})();