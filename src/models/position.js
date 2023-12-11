const mongoose = require('mongoose');

const positionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});

const Position = mongoose.model('position', positionSchema)

module.exports = Position;