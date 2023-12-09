const express = require('express');
const cors = require('cors');
const {connectDB, closeDB} = require('./config/db');

const app = express();

// Connect to Database
connectDB();

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/data', require('./routes/api/crypto'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));