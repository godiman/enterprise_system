const mongoose = require('mongoose');

const salesSchema = mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,  
        required: true
    },
    pakagingType: {
        type: String,
        required: true
    },
    wholePrice: {
        type: String,
        required: true
    },
    unitPrice: {
        type: String,
        required: true
    }, 
    wholeQty: {
        type: String,
        required: true
    }, 
    unitQty: {
        type: String,
        required: true
    }, 
    date: {
        type: Date,
        default: Date.now
    }

});

const Sales = mongoose.model('sales', salesSchema)

module.exports = Sales;