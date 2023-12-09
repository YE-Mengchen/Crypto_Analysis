const Crypto = require('../model/Crypto'); 
const { fetchCryptoDataByDate } = require('../services/cryptoService');
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
