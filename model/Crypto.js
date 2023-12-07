const mongoose = require('mongoose');

const CryptoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  data: [{
    date: {
      type: Date,
      required: true
    },
    high: {
      type: Number,
      required: true
    },
    low: {
      type: Number,
      required: true
    },
    open: {
      type: Number,
      required: true
    },
    close: {
      type: Number,
      required: true
    },
    volume: {
      type: Number,
      required: true
    },
    marketcap: {
      type: Number,
      required: true
    }
  }]
});

module.exports = Crypto = mongoose.model('crypto', CryptoSchema);
