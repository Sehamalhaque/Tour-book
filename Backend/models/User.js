const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['guide', 'admin', 'customer'], default: 'customer' },
  payments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }] // Array of payments made by the user
});

module.exports = mongoose.model('User', userSchema);