const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  stars: { type: Number, min: 0, max: 5, required: true },
  text: { type: String }
});

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }
});

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }
});


const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priceBreakdown: {
    accomodationCost: { type: Number, required: true },
    transportCost: { type: Number, required: true },
    guideFee: { type: Number, required: true },
    platformServiceFee: { type: Number, required: true }
  },
  image: { type: String, required: true },
  isPublic: { type: Boolean, default: true },
  locations: [locationSchema], // Array of tour locations
  hotels: [hotelSchema], // Array of hotels
  reviews: [reviewSchema],
  averageStars: { type: Number, default: 0 },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }] // Array of bookings for the tour
});

module.exports = mongoose.model('Tour', tourSchema);

