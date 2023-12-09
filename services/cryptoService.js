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
  
  module.exports = {
    calculatePriceChange,
    fetchCryptoDataByDate
  };
  