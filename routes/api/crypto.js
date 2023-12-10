const express = require('express');
const router = express.Router();

const Crypto = require('../../model/Crypto');
const cryptoService = require('../../services/cryptoService');

//@route GET api/data
//@desc Return filtered crypto data based on the parameters passed
//@access Public
router.get('/', async (req, res) => {
    try {
      // Read query parameters
      const { days, sortOrder, sortBy, symbol } = req.query;
  
      // Find the most recent entry's date in the database
      const latestEntry = await Crypto.findOne().sort({ date: -1 });
      
      // If there's no latest entry, return an empty array
      if (!latestEntry) {
        return res.status(404).json({ msg: 'No crypto data found' });
      }

      const latestDate = latestEntry.date;
      
      // Calculate the start date based on the number of days provided and the latest date in the database
      const startDate = days ? new Date(latestDate.getTime() - days * 24 * 60 * 60 * 1000) : null;
      
      let query = {};
      
      // If startDate is defined, adjust the query to filter data by date
      if (startDate) {
        query.date = { $gte: startDate };
      }

      // If a symbol is provided, add it to the query to filter by symbol
      if (symbol) {
        query.symbol = symbol;
      }
  
      // Fetch filtered data from the database
      let cryptos = await Crypto.find(query);


      // If sortBy and sortOrder are defined, sort the data accordingly
      if (sortBy) {
        cryptos = cryptos.sort((a, b) => {
          const fieldA = a[sortBy];
          const fieldB = b[sortBy];
          if (sortOrder === 'asc') {
            return fieldA > fieldB ? 1 : -1;
          } else {
            return fieldA < fieldB ? 1 : -1;
          }
        });
      }
  
      res.json(cryptos);
    } catch(err) {
      console.error(err.message);
      res.status(500).send('Server Error');  
    }
});



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