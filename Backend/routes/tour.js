const express = require('express');
const router = express.Router();
const Tour = require('../models/Tour');
const User = require('../models/User');
const authenticateToken = require('../middleware/auth');

// Get public tours
router.get('/all', async (req, res) => {
  try {
    const tours = await Tour.find({ isPublic: true });
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching public tours', error });
  }
});

// Add new tour (only accessible to admin)
router.post('/addtour', authenticateToken, async (req, res) => {
  // Check if user is authenticated and has admin role
  // Access the user ID from req.user
  const userId = req.user.userId;

  // Find the user by ID in the database
  const foundUser = await User.findById(userId);
  
  if (foundUser.role !== 'admin') {
    return res.status(403).json({ message: 'NOT AN ADMIN' });
  }

  // Create a new tour
  const newTour = new Tour({
    title: req.body.title,
    description: req.body.description,
    priceBreakdown: {
      accomodationCost: req.body.priceBreakdown.accomodationCost,
      transportCost: req.body.priceBreakdown.transportCost,
      guideFee: req.body.priceBreakdown.guideFee,
      platformServiceFee: req.body.priceBreakdown.platformServiceFee
    },
    image: req.body.image,
    isPublic: true, // Set tour as public
    locations: req.body.locations,
    hotels: req.body.hotels
  });

  try {
    const savedTour = await newTour.save();
    res.status(201).json(savedTour);
  } catch (error) {
    res.status(500).json({ message: 'Error adding new tour', error });
  }
});

// Delete a tour (only accessible to admin)
router.delete('/deletetour/:tourId', authenticateToken, async (req, res) => {
  try {
    // Access the user ID from req.user
    const userId = req.user.userId;

    // Find the user by ID in the database
    const foundUser = await User.findById(userId);
    
    // Check if user is authenticated and has admin role
    if (foundUser.role !== 'admin') {
      return res.status(403).json({ message: 'NOT AN ADMIN' });
    }

    // Extract the tour ID from request parameters
    const tourId = req.params.tourId;

    // Check if the tour exists
    const existingTour = await Tour.findById(tourId);
    if (!existingTour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    // Delete the tour from the database
    await Tour.findByIdAndDelete(tourId);

    // Return success message
    res.status(200).json({ message: 'Tour deleted successfully' });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Error deleting tour', error });
  }
});

// Update the isPublic field of a tour (only accessible to admin)
router.put('/updateTourIsPublic/:tourId', authenticateToken, async (req, res) => {
  try {
    // Access the user ID from req.user
    const userId = req.user.userId;

    // Find the user by ID in the database
    const foundUser = await User.findById(userId);
    
    // Check if user is authenticated and has admin role
    if (foundUser.role !== 'admin') {
      return res.status(403).json({ message: 'NOT AN ADMIN' });
    }

    // Extract the tour ID from request parameters
    const tourId = req.params.tourId;

    // Check if the tour exists
    const existingTour = await Tour.findById(tourId);
    if (!existingTour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    // Extract the new value for isPublic from request body
    const { isPublic } = req.body;

    // Update the isPublic field of the tour in the database
    existingTour.isPublic = isPublic;
    await existingTour.save();

    // Return success message
    res.status(200).json({ message: 'Tour isPublic updated successfully' });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Error updating tour isPublic', error });
  }
});

// Update tour details
router.put('/updateTour', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find the user by ID in the database
    const foundUser = await User.findById(userId);
    
    // Check if user is authenticated and has admin role
    if (foundUser.role !== 'admin') {
      return res.status(403).json({ message: 'NOT AN ADMIN' });
    }
    
    // Extract the tour ID from request parameters
    const tourId = req.body.tourId;

    // Find the tour by ID
    const existingTour = await Tour.findById(tourId);
    if (!existingTour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    // Check if the authenticated user has permission to update the tour (e.g., only admin)
    // Implement your authorization logic here based on your requirements

    // Update tour details with the new data from request body
    existingTour.title = req.body.title || existingTour.title;
    existingTour.description = req.body.description || existingTour.description;
    existingTour.priceBreakdown = req.body.priceBreakdown || existingTour.priceBreakdown;
    existingTour.image = req.body.image || existingTour.image;
    existingTour.isPublic = req.body.isPublic || existingTour.isPublic;
    existingTour.locations = req.body.locations || existingTour.locations;
    existingTour.hotels = req.body.hotels || existingTour.hotels;

    // Save the updated tour
    const updatedTour = await existingTour.save();

    // Return the updated tour
    res.status(200).json(updatedTour);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Error updating tour', error });
  }
});

// Add a review for a tour
router.post('/addReview/:tourId', authenticateToken, async (req, res) => {
  try {
    // Access the user ID from req.user
    const userId = req.user.userId;

    // Find the user by ID in the database
    const foundUser = await User.findById(userId);
    
    // Check if user is authenticated and has customer role
    if (foundUser.role !== 'customer') {
      return res.status(403).json({ message: 'NOT AN CUSTOMER' });
    }
    // Extract the tour ID from request parameters
    const tourId = req.params.tourId;

    // Check if the tour exists
    const existingTour = await Tour.findById(tourId);
    if (!existingTour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    // Check if the user has already submitted a review for the tour
    const existingReviewIndex = existingTour.reviews.findIndex(review => review.userId.equals(userId));

    // If the user has already submitted a review, update it
    if (existingReviewIndex !== -1) {
      return res.status(404).json({ message: 'One review already exist for this user' });
    }

    // Extract the review details from request body
    const { stars, text } = req.body;

    // Create the review object
    const review = {
      userId: userId,
      stars: stars,
      text: text
    };

    // Add the review to the tour's reviews array
    existingTour.reviews.push(review);

    // Calculate the new average stars
    const totalStars = existingTour.reviews.reduce((acc, cur) => acc + cur.stars, 0);
    existingTour.averageStars = totalStars / existingTour.reviews.length;

    // Update the tour in the database
    await existingTour.save();

    // Return success message
    res.status(200).json({ message: 'Review added successfully' });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Error adding review', error });
  }
});

// Delete a review for a tour
router.delete('/deleteReview/:tourId', authenticateToken, async (req, res) => {
  try {
    // Access the user ID from req.user
    const userId = req.user.userId;

    // Extract the tour ID from request parameters
    const tourId = req.params.tourId;

    // Check if the tour exists
    const existingTour = await Tour.findById(tourId);
    if (!existingTour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    // Find the index of the review by the user ID
    const reviewIndex = existingTour.reviews.findIndex(review => review.userId.equals(userId));

    // If the review is found, remove it
    if (reviewIndex !== -1) {
      existingTour.reviews.splice(reviewIndex, 1);
      
      // Recalculate the average stars
      const totalStars = existingTour.reviews.reduce((acc, cur) => acc + cur.stars, 0);
      existingTour.averageStars = existingTour.reviews.length > 0 ? totalStars / existingTour.reviews.length : 0;

      // Update the tour in the database
      await existingTour.save();

      // Return success message
      return res.status(200).json({ message: 'Review deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    // Handle errors
    return res.status(500).json({ message: 'Error deleting review', error });
  }
});


module.exports = router;