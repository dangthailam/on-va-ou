(function(){
    let mongoose = require('mongoose');
    let Schema = mongoose.Schema;
    
    let eventSchema = Schema({
        title: String,
        time: Date,
        duration: Date,
        phone: String,
        description: String,
        urlSite: String,
        type: {
            type: Schema.Types.ObjectId,
            ref: 'EventType'
        },
        address: {
            type: Schema.Types.ObjectId,
            ref: 'Address'
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    });
    
    var Event = mongoose.model('Event', eventSchema);

    module.exports = Event;
})();