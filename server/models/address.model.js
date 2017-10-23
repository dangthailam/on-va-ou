(function () {
    let mongoose = require('mongoose');
    let Schema = mongoose.Schema;

    let addressSchema = Schema({
        googlePlaceId: {
            type: String,
            required: true
        }
    });

    var Address = mongoose.model('Address', addressSchema);

    module.exports = Address;
})();