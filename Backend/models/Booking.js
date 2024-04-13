const mongoose = require('mongoose');

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookingTime: { type: Date, default: tomorrow },
    numberOfPeople: {
      adults: { type: Number, required: true },
      children: { type: Number, default: 0 }
    },
    confirmedBooking: { type: Boolean, default: false },
    paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Cancelled'], default: 'Pending' },
    totalCost: {
      accomodationCost: { type: Number, required: true },
      transportCost: { type: Number, required: true },
      guideFee: { type: Number, required: true },
      platformServiceFee: { type: Number, required: true },
      vat: { type: Number, required: true }
    },
    paymentId: { type: String } // Store payment ID if available
  });

module.exports = mongoose.model('Booking', bookingSchema);