const mongoose = require('mongoose');

dbconnect = async () => {
    await mongoose.connect(process.env.DB_URI)
}
module.exports = { dbconnect };