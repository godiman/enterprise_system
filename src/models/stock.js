const mongoose = require('mongoose');

const stockSchema = mongoose.Schema({
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
    totalQtyInPackType: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});

const Stock = mongoose.model('stock', stockSchema)

module.exports = Stock;