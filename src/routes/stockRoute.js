const express = require('express');
const stockCont = require('../controllers/stockCont');

const router = express.Router();

router.post('/add-stock', stockCont.registerStock);

module.exports = router;