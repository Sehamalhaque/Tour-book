const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Guide = require('../models/Guide');
const authenticateToken = require('../middleware/auth');

// Promote a customer to a guide
router.post('/p2g', authenticateToken, async (req, res) => {
  try {
    const requserid = req.user.userId;

    // Find the user by ID in the database
    const foundUser = await User.findById(requserid);
    
    // Check if user is authenticated and has admin role
    if (foundUser.role !== 'admin') {
      return res.status(403).json({ message: 'NOT AN ADMIN' });
    }

    // Find the user by ID
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.role == 'admin') {
        return res.status(404).json({ message: 'User is an Admin' });
      }

    // Update the user's role to "guide"
    user.role = 'guide';
    await user.save();

    let tourId = req.body.tourId ? req.body.tourId : null;

    const existingGuide = await Guide.findOne({ userId: req.body.userId });
    if (existingGuide) {
      existingGuide.description = req.body.description || existingGuide.description;
      existingGuide.areaOfExpertise = req.body.areaOfExpertise || existingGuide.areaOfExpertise;
      existingGuide.realName = req.body.realName || existingGuide.realName;
      existingGuide.tourId = tourId;
        
      // Save the updated guide information
      await existingGuide.save();
        
      return res.status(200).json({ message: 'Guide information updated successfully', guide: existingGuide });
    }

    // Create guide information
    const guideInfo = {
      userId: req.body.userId,
      description: req.body.description,
      areaOfExpertise: req.body.areaOfExpertise,
      realName: req.body.realName,
      tourId: tourId
    };

    // Save guide information in the database
    const guide = new Guide(guideInfo);
    await guide.save();

    res.status(200).json({ message: 'User promoted to guide successfully', guide });
  } catch (error) {
    res.status(500).json({ message: 'Error promoting user to guide', error });
  }
});

// Add a review for a guide
router.post('/addReview', authenticateToken, async (req, res) => {
  try {
    // Extract the guide ID from request parameters
    const guideId = req.body.guideId;

    // Find the guide by ID
    const guide = await Guide.findOne({ userId: guideId });
    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }

    // Check if the user has already given a review
    const existingReviewIndex = guide.reviews.findIndex(review => review.userId.toString() === userId);
    if (existingReviewIndex !== -1) {
      // Update the existing review
      guide.reviews[existingReviewIndex].stars = req.body.stars;
      guide.reviews[existingReviewIndex].text = req.body.text;
    } else {
      // Add a new review
      guide.reviews.push({
        userId: userId,
        stars: req.body.stars,
        text: req.body.text
      });
    }
    // Calculate the new average stars for the guide
    const totalStars = guide.reviews.reduce((acc, cur) => acc + cur.stars, 0);
    guide.stars = totalStars / guide.reviews.length;

    // Save the updated guide with the new review and average stars
    await guide.save();

    res.status(200).json({ message: 'Review added successfully', guide });
  } catch (error) {
    res.status(500).json({ message: 'Error adding review', error });
  }
});

router.delete('/deleteReview', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const guideId = req.body.guideId;

    const guide = await Guide.findOne({ userId: guideId });
    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }

    // Find the index of the review associated with the user
    const reviewIndex = guide.reviews.findIndex(review => review.userId.toString() === userId);
    if (reviewIndex === -1) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Remove the review from the array
    guide.reviews.splice(reviewIndex, 1);

    // Recalculate the average stars for the guide
    const totalStars = guide.reviews.reduce((acc, cur) => acc + cur.stars, 0);
    guide.stars = totalStars / guide.reviews.length;

    await guide.save();

    res.status(200).json({ message: 'Review deleted successfully', guide });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error });
  }
});

module.exports = router;