const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user who posted the review
  stars: { type: Number, min: 0, max: 5, required: true }, // Stars given by the user for this review
  text: { type: String } // Text content of the review
});

const guideSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reviews: [reviewSchema],
  stars: { type: Number, min: 0, max: 5, default: 0 },
  description: { type: String },
  areaOfExpertise: { type: String },
  realName: { type: String },
  tourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour' }
});

module.exports = mongoose.model('Guide', guideSchema);