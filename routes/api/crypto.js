const express = require('express');
const router = express.Router();

//@route GET api/crypto
//@desc Test route
//@access Public
router.get('/',(req,res) => res.send('Crypto route'));
module.exports = router;