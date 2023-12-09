/**
 * Fetches cryptocurrency data by symbol and date.
 * @param {string} symbol - The symbol of the cryptocurrency to fetch.
 * @param {Date} date - The date for which to fetch the cryptocurrency data.
 * @returns {Promise<Object|null>} A promise that resolves with the cryptocurrency data or null if not found.
 */
async function fetchCryptoDataByDate(symbol, date) {
    return await Crypto.findOne({ symbol, date: date});
  }
  
  /**
   * Calculates the price change of a cryptocurrency between two dates.
   * @param {string} symbol - The symbol of the cryptocurrency to calculate the price change for.
   * @param {number} days - The number of days in the past to calculate the price change from.
   * @param {Date} endDate - The end date for the price comparison.
   * @returns {Promise<Object|null>} A promise that resolves with the price change data or null if data for the dates is not found.
   */
  async function calculatePriceChange(symbol, days, endDate) {

    const startDate = new Date(endDate - (days * 24 * 60 * 60 * 1000));

    const startData = await fetchCryptoDataByDate(symbol, startDate);
    const endData = await fetchCryptoDataByDate(symbol, endDate);
  
    if (startData && endData) {
      const startPrice = startData.close;
      const endPrice = endData.close;
      const change = endPrice - startPrice;
      const percentageChange = (change / startPrice) * 100;
      return {
        symbol: symbol,
        startPrice: startPrice,
        endPrice: endPrice,
        change: (endPrice - startPrice).toFixed(2), // Calculate the price change
        percentageChange: percentageChange.toFixed(2)
      };
    }
  
    return null; // If no data is found, return null
  }


/**
 * Retrieves and sorts cryptocurrency data based on a specified attribute and order.
 * @param {string} sortOrder - The order to sort the data ('asc' for ascending, 'desc' for descending).
 * @param {string} sortBy - The attribute to sort the data by (e.g., 'marketcap', 'volume', 'name').
 * @returns {Promise<Array<Object>|null>} A promise that resolves with an array of sorted cryptocurrency data or null if no data is found.
 */
  async function getSortedCryptoData(sortOrder = 'desc', sortBy = 'marketcap') {
    try {
      const latestCrypto = await Crypto.findOne().sort({ date: -1 });
      if (!latestCrypto) {
        return null;
      }
      const latestDate = latestCrypto.date;
      const latestCryptos = await Crypto.find({ date: latestDate });
  
      const cryptoDataWithChanges = await Promise.all(latestCryptos.map(async crypto => {
        const oneDayChange = await calculatePriceChange(crypto.symbol, 1, latestDate);
        const sevenDayChange = await calculatePriceChange(crypto.symbol, 7, latestDate);
        const thirtyDayChange = await calculatePriceChange(crypto.symbol, 30, latestDate);
  
        return {
          ...crypto.toObject(),
          oneDayChange: oneDayChange ? oneDayChange.percentageChange : null,
          sevenDayChange: sevenDayChange ? sevenDayChange.percentageChange : null,
          thirtyDayChange: thirtyDayChange ? thirtyDayChange.percentageChange : null
        };
      }));
  
      return cryptoDataWithChanges.sort((a, b) => {
        if (sortBy === 'symbol') {
          return sortOrder === 'asc' ? a.symbol.localeCompare(b.symbol) : b.symbol.localeCompare(a.symbol);
        } else {
          const sortValueA = a[sortBy];
          const sortValueB = b[sortBy];
          return sortOrder === 'asc' ? sortValueA - sortValueB : sortValueB - sortValueA;
        }
      });

    } catch (error) {
      console.error('Error getting sorted crypto data:', error);
      throw error;
    }
  }
  







  
  module.exports = {
    calculatePriceChange,
    fetchCryptoDataByDate,
    getSortedCryptoData
  };
  