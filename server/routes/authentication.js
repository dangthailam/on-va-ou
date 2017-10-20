(function(){
    const express = require('express');
    const authenticationRouter = express.Router();
    const jwt = require('jsonwebtoken');
    
    const config = require('../config/config');
    const User = require('../models/user.model');

    authenticationRouter.post('/', function (req, res, next) {
        User.findOne({ username: req.body.username }, function (err, user) {
            if (err) {
                return res.status(400).send({ error: 'Error' });
            }

            if (!user) {
                return res.status(404).send({ error: 'User not found' });
            }
            user.verifyPassword(req.body.password, function (err, isMatch) {
                if (err) {
                    return next(err);
                }

                if (isMatch) {
                    let payload = {
                        _id: user._id,
                        username: user.username,
                        fisrtname: user.firstname,
                        lastname: user.lastname,
                        role: user.role
                    };

                    let token = jwt.sign(payload, config.secret);
                    return res.json({
                        token: token
                    });
                } else {
                    return res.status(401).send({ error: 'User not authorized' });
                }
            });
        });
    });

    module.exports = authenticationRouter;
})();