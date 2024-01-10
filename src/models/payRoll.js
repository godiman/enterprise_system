const mongoose = require('mongoose');

const payRollSchema  = mongoose.Schema({
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
    status: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const PayRoll  = mongoose.model('PayRoll ', payRollSchema)

module.exports = PayRoll ;