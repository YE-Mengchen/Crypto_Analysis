// MainPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'; 

const MainPage = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState('desc');
  const [sortBy, setSortBy] = useState('marketcap');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/data/sorted-cryptos?sortOrder=${sortOrder}&sortBy=${sortBy}`);
        setCryptoData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sortOrder, sortBy]);

  const getColorClass = (value) => {
    if (value > 0) return 'positive';
    if (value < 0) return 'negative';
    return 'neutral'; 
  };

  const renderSortArrow = (column) => {
    return sortBy === column ? (sortOrder === 'desc' ? '↓' : '↑') : '';
  };

  return (
    <div>
      <h1>Cryptocurrency Market Dashboard</h1>
      <div>
        <label htmlFor="sortOrder">Sort Order:</label>
        <select id="sortOrder" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>

        <label htmlFor="sortBy">Sort By:</label>
        <select id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="marketcap">Market Cap</option>
          <option value="volume">Volume</option>
          <option value="close">Price</option>
          <option value="oneDayChange">24h Change</option>
          <option value="sevenDayChange">7d Change</option>
          <option value="thirtyDayChange">30d Change</option>
          <option value="symbol">Symbol</option>
        </select>
      </div>
      {loading ? (
        <p className="loading">Loading... Up to 10 seconds</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Symbol</th>
              <th className={sortBy === 'close' ? 'highlighted-header' : ''}>
                Price {renderSortArrow('close')}
              </th>
              <th className={sortBy === 'volume' ? 'highlighted-header' : ''}>
                Volume {renderSortArrow('volume')}
              </th>
              <th className={sortBy === 'marketcap' ? 'highlighted-header' : ''}>
                Market Cap {renderSortArrow('marketcap')}
              </th>
              <th className={sortBy === 'oneDayChange' ? 'highlighted-header' : ''}>
                24h Change {renderSortArrow('oneDayChange')}
              </th>
              <th className={sortBy === 'sevenDayChange' ? 'highlighted-header' : ''}>
                7d Change {renderSortArrow('sevenDayChange')}
              </th>
              <th className={sortBy === 'thirtyDayChange' ? 'highlighted-header' : ''}>
                30d Change {renderSortArrow('thirtyDayChange')}
              </th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((crypto, index) => (
              <tr key={index}>
                <td>{crypto.name}</td>
                <td>{crypto.symbol}</td>
                <td>{crypto.close}</td>
                <td>{crypto.volume}</td>
                <td>{crypto.marketcap}</td>
                <td className={getColorClass(crypto.oneDayChange)}>
                  {crypto.oneDayChange}%
                </td>
                <td className={getColorClass(crypto.sevenDayChange)}>
                  {crypto.sevenDayChange}%
                </td>
                <td className={getColorClass(crypto.thirtyDayChange)}>
                  {crypto.thirtyDayChange}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MainPage;
