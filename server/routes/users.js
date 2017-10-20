(function () {
    const express = require('express');
    const userRouter = express.Router();
    const jwt = require('jsonwebtoken');
    const config = require('../config/config');

    const User = require('../models/user.model');

    userRouter.get('/', function (req, res, next) {
        User.find({}, function (err, users) {
            if (err) return next(err);
            res.json(users);
        });
    });

    userRouter.get('/:id', function (req, res, next) {
        User.findOne({ _id: req.params.id }).then(function (user) {
            res.status(200).json(user);
        }).catch(function (err) {
            res.status(400).send({
                success: true,
                message: err
            });
        });
    });

    userRouter.patch('/', function (req, res, next) {
        User.findOne({ _id: req.decoded._id }, function (err, user) {
            if (err) return res.status(400).send({
                success: false,
                message: 'Error'
            });

            if (!user) return res.status(404).send({
                success: false,
                message: 'User not found'
            });

            //TODO
        });
    });

    userRouter.post('/', function (req, res, next) {
        res.json(req.body);
        let newUser = User({
            username: req.body.username,
            password: req.body.password,
            role: req.body.role || 'user'
        });

        newUser.save().then(function (user) {
            res.status(201).json(user);
        }).catch(function (err) {
            res.status(400).send({
                success: true,
                message: err
            });
        });
    });

    module.exports = userRouter;
})();