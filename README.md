# Cryptocurrency Market Dashboard

## Overview

This project provides a comprehensive dashboard for monitoring the market data of various cryptocurrencies. It is currently deployed at [Frontend Dashboard](https://crypto-market-dashboard-frontend.onrender.com/) with the backend API accessible at [Backend API](https://crypto-market-dashboard-backend.onrender.com/).

The dashboard displays real-time data, including prices, market capitalization, and historical price changes of different cryptocurrencies similar to the functionality offered by CoinGecko.

## Features Implemented

The project meets several requirements outlined in the initial challenge:

- **Data Ordering and Display**: Cryptocurrencies are ordered by market cap in descending order and display relevant attributes such as Price, 24h change, 7d change, 30d change, Volume, and Market Cap.
- **Technology Stack**: The project makes use of ReactJS for the frontend and Node.js for the backend, with a NoSQL database for data persistence.
- **API Utilization**: The backend retrieves data from a database and processes it efficiently, making it available via RESTful APIs.
- **Frontend Design**: The data is displayed in a user-friendly web page using React components.
- **Code Quality**: The code follows best practices, including clear and concise JSON representation and the use of ES6 features.

Please note that Docker and AWS integration is not included in this deployment.

## API Usage

The backend API supports several query parameters to customize the data retrieval based on the client's needs:

- `sortOrder`: Determines the order of results (e.g., `asc` for ascending, `desc` for descending).
- `sortBy`: Specifies the attribute to sort the data by (e.g., `marketcap`, `volume`, `price`).
- `days`: Filters the data to include only the last X days.
- `symbol`: Filters the results for a specific cryptocurrency symbol.

### Example Requests

- Get cryptocurrencies sorted by market cap in descending order:
- GPT
基于您提供的信息，下面是一个README.md的草案，您可以根据实际情况进一步修改和完善：

markdown
Copy code
# Cryptocurrency Market Dashboard

## Overview

This project provides a comprehensive dashboard for monitoring the market data of various cryptocurrencies. It is currently deployed at [Frontend Dashboard](https://crypto-market-dashboard-frontend.onrender.com/) with the backend API accessible at [Backend API](https://crypto-market-dashboard-backend.onrender.com/).

The dashboard displays real-time data, including prices, market capitalization, and historical price changes of different cryptocurrencies similar to the functionality offered by CoinGecko.

## Features Implemented

The project meets several requirements outlined in the initial challenge:

- **Data Ordering and Display**: Cryptocurrencies are ordered by market cap in descending order and display relevant attributes such as Price, 24h change, 7d change, 30d change, Volume, and Market Cap.
- **Technology Stack**: The project makes use of ReactJS for the frontend and Node.js for the backend, with a NoSQL database for data persistence.
- **API Utilization**: The backend retrieves data from a database and processes it efficiently, making it available via RESTful APIs.
- **Frontend Design**: The data is displayed in a user-friendly web page using React components.
- **Code Quality**: The code follows best practices, including clear and concise JSON representation and the use of ES6 features.

Please note that Docker and AWS integration is not included in this deployment.

## API Usage

The backend API supports several query parameters to customize the data retrieval based on the client's needs:

- `sortOrder`: Determines the order of results (e.g., `asc` for ascending, `desc` for descending).
- `sortBy`: Specifies the attribute to sort the data by (e.g., `marketcap`, `volume`, `price`).
- `days`: Filters the data to include only the last X days.
- `symbol`: Filters the results for a specific cryptocurrency symbol.

### Example Requests

- Get cryptocurrencies sorted by market cap in descending order:
GET /api/data/sorted-cryptos?sortOrder=desc&sortBy=marketcap

- Get cryptocurrencies data for the past 7 days:
GET /api/data?days=7

- Get a specific cryptocurrency data by symbol:
GET /api/data?symbol=BTC


For detailed information on the API endpoints and usage, please refer to the API documentation provided at the backend API link.

## Local Development

To run this project locally, you will need to clone the repository and install the required dependencies for both the frontend and the backend.

### Prerequisites

- Node.js
- npm or yarn
- MongoDB running locally or accessible via the cloud

### Setup and Installation

1. Clone the repository:
 ```sh
 git clone [repository URL]
 cd [repository directory]
Install dependencies for the backend:
cd backend
npm install
Install dependencies for the frontend:
cd frontend
npm install
Start the backend server:
npm start
Start the frontend application:
npm start
After following these steps, the frontend should be accessible at http://localhost:3000 and the backend at http://localhost:5000.

Contact
For any additional information or queries, please reach out to the repository owner or submit an issue on the GitHub project page.
