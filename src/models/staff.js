const mongoose = require('mongoose');

const staffSchema = mongoose.Schema({

    fName: {
        type: String,        
        required: true
    },

    email: {
        type: String,
        required: true,
    },

    address: {
        type: String,                                         
        required: true,
    },

    dateOfBirth: {
        type: String,
        required: true,
    },

    gender: {
       type: String,
       required: true,
    },
  
    position: {
        type: String,
        required: true,
    },

    department: {
        type: String,
        required: true,
    },

    staffType: {
        type: String,
        required: true,
    },

    contractEndDate: {
        type: String,
        required: true,
    },

    amount: {
        type: String,
    },

    image: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }

});


const Staff = mongoose.model('staff', staffSchema)
module.exports = Staff;