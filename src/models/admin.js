const mongoose = require('mongoose');

const bcryptjs = require('bcryptjs');

const adminSchema = mongoose.Schema({
    userName: {
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
    password: {
        type: String,
        required: true,
    },
});


adminSchema.pre('save', async function (next) {
    const salt = await bcryptjs.genSalt();
    this.password = await bcryptjs.hash(this.password, salt);
});

adminSchema.statics.login = async function (email, password) {
    const admin = await this.findOne({ email });
    // console.log(admin);

    if (admin) {
        // Compare password
        const auth = await bcryptjs.compare(password, admin.password);
        
        // console.log(auth);
        // Check if password match
        if (auth) {
            return admin;
        }
        throw new Error('Incorrect Email or password');
    }
    throw new Error('Incorrect Email or password'); 
}
const Admin = mongoose.model('admin', adminSchema)

module.exports = Admin;