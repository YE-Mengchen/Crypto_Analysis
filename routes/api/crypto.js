const express = require('express');
const router = express.Router();

const Crypto = require('../../model/Crypto');

//@route GET api/data
//@desc Test route
//@access Public
router.get('/', async (req, res) => {
        try{
            const cryptos = await Crypto.find();
            res.json(cryptos);
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server Error');  
        }
    }
)


module.exports = router;