const mongoose = require('mongoose');

const payRollSchema = mongoose.Schema({
    staff: {
        type: mongoose.Schema.ObjectId,
        ref: 'staff'
    },
    position: {
        type: mongoose.Schema.ObjectId,
        ref: 'position'
    },
    workerSalery: {
        type: String,
        required: true
    },
    workerAllowance: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const payRoll = mongoose.model('payRoll', payRollSchema)

module.exports = payRoll;