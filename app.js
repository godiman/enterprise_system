const express = require('express');
require('dotenv').config();

const pageRoute = require('./src/routes/pageRoute');
const payRollRoute = require('./src/routes/payRollRoute');
const adminRoute = require('./src/routes/adminRoute');
const authRoute = require('./src/routes/authRoute');
const staffRoute = require('./src/routes/staffRoute');
const stockRoute = require('./src/routes/stockRoute');
const { dbconnect } = require('./config/dbConnection');
const cookieParser = require('cookie-parser');  
const path = require('path');     

const app = express();

port = process.env.APP_PORT || 4041;

app.use(express.json());
app.use(cookieParser());

// Import Routers
app.use(pageRoute)
app.use(payRollRoute);
app.use('/admin', adminRoute);
app.use('/auth', authRoute);
app.use('/staff', staffRoute);
app.use('/stock', stockRoute);

//Config ejs templete
app.set('view engine', 'ejs');

// Set static file direction
app.use(express.static(path.join(__dirname, '/public')));

// DB Connection  
dbconnect().then(res => console.log('Connected'))

.catch(e => console.log(e))

app.listen(port, () => {
    console.log(`App Running on  Port ${port}`);
})     
