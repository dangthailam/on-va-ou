(function () {
    let mongoose = require('mongoose');
    let Schema = mongoose.Schema;
    let bcrypt = require('bcrypt');
    let SALT = 10;

    let userSchema = Schema({
        firstName: String,
        lastName: String,
        role: {
            type: String,
            enum: ['admin', 'user'],
            required: true
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    });

    userSchema.methods.verifyPassword = function (password, cb) {
        bcrypt.compare(password, this.password, function (err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    };

    userSchema.pre('save', function (next) {
        var user = this;

        if (!user.isModified('password')) return next();

        bcrypt.genSalt(SALT, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);

                user.password = hash;
                next();
            });
        });
    });

    var User = mongoose.model('User', userSchema);

    module.exports = User;
})();