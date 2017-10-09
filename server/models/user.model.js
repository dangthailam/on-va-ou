(function(){
    let mongoose = require('mongoose');
    let Schema = mongoose.Schema;
    
    let userSchema = Schema({
        firstName: String,
        lastName: String
    });
    
    mongoose.model('User', userSchema);
})();