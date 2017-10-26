(function () {
    let mongoose = require('mongoose');
    let Schema = mongoose.Schema;

    let addressSchema = Schema({
        googlePlaceId: {
            type: String,
            required: true
        },
        __v: { 
            type: Number, 
            select: false 
        }
    });

    var Address = mongoose.model('Address', addressSchema);

    module.exports = Address;
})();