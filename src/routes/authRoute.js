const express = require('express');
const authCont = require('../controllers/authCont');
const {imgHandler} = require('../helpers/imgHandler')
const router = express.Router();


router.post('/sign-in', authCont.login);

                     
module.exports = router;