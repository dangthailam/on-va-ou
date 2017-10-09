(function(){
    let mongoose = require('mongoose');
    let Schema = mongoose.Schema;
    
    let addressSchema = Schema({
        lat: Number,
        lon: Number
    });
    
    mongoose.model('Address', addressSchema);
})();