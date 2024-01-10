const express = require('express');
const staffCont = require('../controllers/staff.Cont');

const router = express.Router();

router.post('/staff-registration', staffCont.staffRegistration);

module.exports = router;