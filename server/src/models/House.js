const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // owner
  title: String,
  location: String,
  rent_price: Number,
  num_rooms: Number,
  description: String,
  images: [String], // image URLs
  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('House', houseSchema);
