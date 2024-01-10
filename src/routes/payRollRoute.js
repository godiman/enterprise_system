const express = require('express');
const payRollCont = require('../controllers/payRollCont');

const router = express.Router();

router.post('/add-payRoll', payRollCont.payRoll);

module.exports = router;