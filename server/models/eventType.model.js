(function(){
    let mongoose = require('mongoose');
    let Schema = mongoose.Schema;
    
    let eventTypeSchema = Schema({
        type: {
            type: String,
            required: true
        }
    });
    
    var EventType = mongoose.model("EventType", eventTypeSchema);

    module.exports = EventType;
})();