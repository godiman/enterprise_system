const router = require('express').Router();
const pageCont = require('../controllers/pageCont');

router.get('/', pageCont.index);



module.exports = router;