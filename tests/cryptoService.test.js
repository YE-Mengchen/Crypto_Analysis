const Crypto = require('../model/Crypto'); 
const { fetchCryptoDataByDate, calculatePriceChange, getSortedCryptoData } = require('../services/cryptoService');
const {connectDB, closeDB} = require('../config/db');

beforeAll(async () => {
    connectDB();
  });

afterAll(async() => {
    await closeDB();
});



describe('Test fetchCryptoDataByDate Function', () => {
  it('should return correct data for BNB on 2021-07-06 23:59:59', async () => {
    const symbol = 'BNB';
    const date = new Date('2021-07-06T23:59:59.000Z');
    const expectedData = {
      close: 320.93480178,
      volume: 2203265497.94,
      marketcap: 49241956385.46
    };
    const result = await fetchCryptoDataByDate(symbol, date);

    expect(result).toBeDefined();
    expect(result.close).toEqual(expectedData.close);
    expect(result.volume).toEqual(expectedData.volume);
    expect(result.marketcap).toEqual(expectedData.marketcap);
  });
});

describe('Test calculatePriceChange Function', () => {
    it('should return correct price change data for BTC for the past 30 days ending on 2021-07-06', async () => {
      const symbol = 'BTC';
      const days = 30;
      const endDate = new Date('2021-07-06T23:59:59.000Z');
  
      const expectedData = {
        symbol: 'BTC',
        startPrice: 35862.37772747,
        endPrice: 34235.19345116,
        change: '-1627.18',
        percentageChange: '-4.54'
      };
  
      const result = await calculatePriceChange(symbol, days, endDate);
  
      expect(result).toBeDefined();
      expect(result.startPrice).toEqual(expectedData.startPrice);
      expect(result.endPrice).toEqual(expectedData.endPrice);
      expect(result.change).toEqual(expectedData.change);
      expect(result.percentageChange).toEqual(expectedData.percentageChange);
    });
  });


  describe('Test getSortedCryptoData Function', () => {
    it('should return cryptos sorted by marketcap in descending order', async () => {
      const expectedOrder = ['BTC', 'ETH', 'USDT', 'BNB', 'ADA', 'XRP', 'DOGE', 'USDC', 'DOT', 'UNI', 'SOL', 'LTC', 'LINK', 'WBTC', 'XLM', 'TRX', 'AAVE', 'XMR', 'EOS', 'CRO', 'ATOM', 'MIOTA', 'XEM'];
      const sortedCryptos = await getSortedCryptoData('desc', 'marketcap');
      const symbols = sortedCryptos.map(crypto => crypto.symbol);
      
      expect(symbols).toEqual(expectedOrder);
    });
  });





