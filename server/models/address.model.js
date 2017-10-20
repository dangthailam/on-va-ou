(function () {
    let mongoose = require('mongoose');
    let Schema = mongoose.Schema;

    let addressSchema = Schema({
        lat: {
            type: Number,
            required: true
        },
        lon: {
            type: Number,
            required: true
        },
        number: String,
        street: String,
        city: String,
        postal: String,
        country: String
    });

    var Address = mongoose.model('Address', addressSchema);

    module.exports = Address;
})();