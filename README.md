# Cryptocurrency Market Dashboard

## Overview
<img width="1018" alt="Screen Shot 2023-12-11 at 7 53 29 pm" src="https://github.com/YE-Mengchen/Crypto_Analysis/assets/31925707/6223a473-60c1-4b09-ba3c-de1b89e49e5f">

This take-home project is part of interview, provides a comprehensive dashboard for monitoring the market data of various cryptocurrencies. It is currently deployed at https://crypto-market-dashboard-frontend.onrender.com/ with the backend API accessible at https://crypto-market-dashboard-backend.onrender.com/.

## Features Implemented

The project successfully addresses several key requirements outlined in the project requirements:

- **Data Ordering and Display**: 
  - Cryptocurrencies can be ordered by market cap in a user-specified order (ascending or descending).
  - Displays relevant attributes such as Price, 24h change, 7d change, 30d change, Volume, and Market Cap.
  - Users have the flexibility to choose the attribute by which the data is ordered.

- **Technology Stack**: 
  - Frontend developed using ReactJS.
  - Backend developed using Node.js.
  - MongoDB Atlas used for data persistence.
  - Python and Jupyter Notebook are utilized for processing and pre-processing CSV data, including tasks like checking for null values before uploading to MongoDB Atlas.

- **API Utilization**: 
  - Backend efficiently retrieves and processes data from the database.
  - Data made available through RESTful APIs.
  - Includes capabilities for sorting, filtering, and customizing data retrieval based on user preferences.

- **Frontend Design**: 
  - Frontend design enhanced with the assistance of ChatGPT-4 for CSS code modification.
  - Visually appealing and user-friendly web page using React components.

- **Code Quality**: 
  - Adheres to best coding practices.
  - Code is free from hardcoding and ensures extensibility.
  - Facilitates easy implementation of additional features like custom date selection with minimal changes to the existing codebase.

- **Caching Strategy**: 
  - Implemented a caching strategy to optimize data retrieval and performance.
  - Detailed documentation available in a PDF within this repository.

**Note**: Docker and AWS integration, not included in this deployment, are considered as potential future enhancements. The current deployment is hosted on Render due to time constraints.

## API Usage

The backend API supports several query parameters to customize the data retrieval based on the client's needs:

- `sortOrder`: Determines the order of results (e.g., `asc` for ascending, `desc` for descending).
- `sortBy`: Specifies the attribute to sort the data by (e.g., `marketcap`, `volume`, `price`).
- `days`: Filters the data to include only the last X days.
- `symbol`: Filters the results for a specific cryptocurrency symbol.

### Example Requests

The API provides several endpoints to retrieve cryptocurrency data. You can interact with the API by making HTTP GET requests to the following endpoints with optional query parameters:

### Get Filtered Cryptocurrency Data

Retrieve filtered cryptocurrency data based on specified query parameters such as the number of days to look back, sort order, sort by attribute, and cryptocurrency symbol.

- **URL**: `https://crypto-market-dashboard-backend.onrender.com/api/data`
- **Method**: `GET`
- **Query Parameters**:
  - `days`: The number of days from the current date to filter the data.
  - `sortOrder`: The order to sort the results (`asc` or `desc`).
  - `sortBy`: The field to sort the data by (e.g., `price`, `volume`, `marketcap`).
  - `symbol`: The cryptocurrency symbol to filter the data (e.g., `BTC`, `ETH`).

#### Examples:

- Retrieve the last 7 days of data for all cryptocurrencies, sorted by market cap in descending order:
  https://crypto-market-dashboard-backend.onrender.com/api/data?days=7&sortOrder=desc&sortBy=marketcap

- Retrieve data for a specific cryptocurrency symbol (`BTC`), sorted by price in ascending order:
 https://crypto-market-dashboard-backend.onrender.com/api/data?symbol=BTC&sortOrder=asc&sortBy=price

You can also test these endpoints locally if you have the API running on your machine.
Feel free to adjust the query parameters to match your specific requirements and test different combinations to see how the API responds.

### Get Latest day's Sorted Cryptocurrency Data

This endpoint returns latest day's cryptocurrency data sorted by market cap in the specified order. It is less customizable compared to the `/api/data` endpoint and is primarily used by front-end.

- **URL**: `https://crypto-market-dashboard-backend.onrender.com/api/data/sorted-cryptos`
- **Method**: `GET`
- **Query Parameters**:
  - `sortOrder`: The order to sort the results (`asc` or `desc`). Defaults to `desc`.
  - `sortBy`: The field to sort the data by (e.g., `marketcap`). Defaults to `marketcap`.

#### Example:

- Retrieve Latest day's data sorted by market cap in descending order:
https://crypto-market-dashboard-backend.onrender.com/api/data/sorted-cryptos?sortOrder=desc&sortBy=marketcap

## Local Development

To run this project locally, you will need to clone the repository and install the required dependencies for both the frontend and the backend.

### Prerequisites

- Node.js
- npm
  
### Setup and Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
    Just clone from main page

2. **Install backend dependencies**:
    ```sh
    npm install
    ```

3. **Install frontend dependencies**:
    ```sh
    cd client
    npm install
    cd ..
    ```

4. **Start the project**:
    ```sh
    npm run dev
    ```
    This command will start both the frontend and backend servers.

5. **(Optional) Run tests**:
    ```sh
    npm test
    ```
    Use this command if you need to run tests.

After completing these steps, the frontend should be accessible at `http://localhost:3000`, and the backend should be running on `http://localhost:5000`.

### Contact

For any additional information or queries, please reach out to yemengchen4371@gmail.com or submit an issue on the GitHub project page.
