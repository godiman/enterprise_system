const mongoose = require('mongoose');

const packageSchema = mongoose.Schema({
    pakagingType: {
        type: String,
        required: true
    },  
    date: {
        type: Date,
        default: Date.now
    }

});

const Package = mongoose.model('package', packageSchema)

module.exports = Package;   