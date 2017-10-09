(function(){
    let mongoose = require('mongoose');
    let Schema = mongoose.Schema;
    
    let eventTypeSchema = Schema({
        type: String
    });
    
    mongoose.model("EventType", eventTypeSchema);  
})();