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


//@route GET api/data/marketcap-desc
//@desc Order the crypto by its market cap in descending mode, only return today's data
//@access Public
router.get('/marketcap-desc', async (req, res) => {
    try {
        // Get latest date
        const latestCrypto = await Crypto.findOne().sort({ date: -1 });
        // check where latestCrypto exist or not
        if (!latestCrypto) {
            res.status(404).send('No data found');
        }
        const latestDate = latestCrypto.date;
        // Get
        const toReturn = await cryptoService.getSortedCryptoData(sortOrder = 'desc', sortBy = 'marketcap');
        res.status(200).send(toReturn);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');  
    }
});


module.exports = router;