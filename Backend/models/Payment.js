const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  paymentAmount: { type: Number, required: true },
  refid : { type: Number, required: true }
  // Add other payment references as needed
});

module.exports = mongoose.model('Payment', paymentSchema);