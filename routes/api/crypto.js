const express = require('express');
const router = express.Router();

const Crypto = require('../../model/Crypto');
const cryptoService = require('../../services/cryptoService');

//@route GET api/data
//@desc Return ALL crypto data
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
);


//@route GET api/data/sorted-cryptos
//@desc Order the crypto by its market cap in descending mode, only return today's data
//@access Public
router.get('/sorted-cryptos', async (req, res) => {
    try {
        // Get parameters used to ranking from request
        const sortOrder = req.query.sortOrder || 'desc';
        const sortBy = req.query.sortBy || 'marketcap';
        const toReturn = await cryptoService.getSortedCryptoData(sortOrder, sortBy);
        res.status(200).send(toReturn);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');  
    }
});


module.exports = router;