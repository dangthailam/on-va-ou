(function () {
    let mongoose = require('mongoose');
    let Schema = mongoose.Schema;

    let eventSchema = Schema({
        title: {
            type: String,
            required: true
        },
        startedDate: {
            type: Date,
            required: true
        },
        endedDate: {
            type: Date,
            required: true
        },
        phone: String,
        description: {
            type: String,
            required: true
        },
        urlSite: String,
        type: {
            type: Schema.Types.ObjectId,
            ref: 'EventType',
            required: true
        },
        address: {
            type: Schema.Types.ObjectId,
            ref: 'Address',
            required: true
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    });

    var Event = mongoose.model('Event', eventSchema);

    module.exports = Event;
})();