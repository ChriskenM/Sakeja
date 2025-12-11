const mongoose = require('mongoose');
const savedSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User', required:true},
  house: {type: mongoose.Schema.Types.ObjectId, ref:'House', required:true},
  createdAt: {type: Date, default: Date.now}
});
module.exports = mongoose.model('SavedListing', savedSchema);
