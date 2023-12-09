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
        setLoading(true); // 开始加载数据
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

  const getColor = (value) => {
    if (value > 0) return 'green';
    if (value < 0) return 'red';
    return 'black'; 
  };


  return (
    <div>
      <h1>MainPage</h1>
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
        <p className="loading">Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Symbol</th>
              <th>Price</th>
              <th>Volume</th>
              <th>Market Cap</th>
              <th>24h Change</th>
              <th>7d Change</th>
              <th>30d Change</th>
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
                <td style={{ color: getColor(crypto.oneDayChange) }}>{crypto.oneDayChange}%</td>
                <td style={{ color: getColor(crypto.sevenDayChange) }}>{crypto.sevenDayChange}%</td>
                <td style={{ color: getColor(crypto.thirtyDayChange) }}>{crypto.thirtyDayChange}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MainPage;
