const express = require('express');
const router = express.Router();
const Tour = require('../models/Tour');
const User = require('../models/User');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');
const authenticateToken = require('../middleware/auth');

// Add a booking to a tour
router.post('/bookings', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const tourId = req.body.tourId;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user || user.role == 'admin') {
      return res.status(404).json({ message: 'User not found or not allowed to book' });
    }

    // Find the tour by ID
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }
    if (!req.body.numberOfPeople || req.body.numberOfPeople.adults < 1) {
        return res.status(400).json({ message: 'At least one adult must be included in the booking' });
    }

    const { accomodationCost, transportCost, guideFee, platformServiceFee } = tour.priceBreakdown;

    // Calculate total accomodation cost
    const totalAccomodationCost = accomodationCost * req.body.numberOfPeople.adults;

    // Calculate total transport cost
    const totalTransportCost = transportCost * req.body.numberOfPeople.adults + (transportCost * 0.5) * req.body.numberOfPeople.children;

    // Calculate total cost without VAT
    const totalCostWithoutVat = totalAccomodationCost + totalTransportCost + guideFee + platformServiceFee;

    // Calculate VAT
    const vat = totalCostWithoutVat * 0.15;

    // Create a new booking object
    const newBooking = new Booking({
      userId: userId,
      bookingTime: req.body.bookingTime || Date.now(), // Use current time if not provided
      numberOfPeople: {
        adults: req.body.numberOfPeople.adults || 0,
        children: req.body.numberOfPeople.children || 0
      },
      confirmedBooking: req.body.confirmedBooking || false,
      paymentStatus: req.body.paymentStatus || 'Pending',
      totalCost: {
        accomodationCost: totalAccomodationCost,
        transportCost: totalTransportCost,
        guideFee: guideFee,
        platformServiceFee: platformServiceFee,
        vat: vat
      },
      paymentId: req.body.paymentId || ''
    });

    // Add the booking to the Booking
    const savedbooking = await newBooking.save()

    // Save the updated tour
    tour.bookings.push(savedbooking._id);
    await tour.save();

    res.status(201).json({ message: 'Booking added successfully', booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: 'Error adding booking', error });
  }
});

// Add a payment to a user
router.post('/payments', authenticateToken, async (req, res) => {
    try {
      const userId = req.user.userId;
      const bookingId = req.body.BookingId;
  
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const booking = await Booking.findById(bookingId);
      if (!booking || booking.userId !== userId) {
        return res.status(404).json({ message: 'Booking identifier error' });
      }

      const { accomodationCost, transportCost, guideFee, platformServiceFee, vat } = booking.totalCost;
      const discount = req.body.discount || 0;
      
      const totalcost = accomodationCost + transportCost + guideFee + platformServiceFee + vat - discount;

      const newPayment = new Payment({
        userId : userId,
        bookingId : bookingId,
        paymentAmount : totalcost,
        refid : req.body.refid
      });

      const savedpayment = await newPayment.save();

      booking.paymentId = savedpayment._id;
      booking.paymentStatus = 'Paid';
      booking.confirmedBooking = true;
      await booking.save();
      user.payments.push(savedpayment._id);
      await user.save();
  
      res.status(201).json({ message: 'Payment added successfully', payment: newPayment });
    } catch (error) {
      res.status(500).json({ message: 'Error adding payment', error });
    }
  });

router.post('/cancelBooking', authenticateToken, async (req, res) => {

    const userId = req.user.userId;
    const bookingId = req.body.bookingId;

    // Find the user by ID in the database
    const foundUser = await User.findById(userId);
    
    // Check if user is authenticated and has admin role
    if (foundUser.role == 'customer') {
      return res.status(403).json({ message: 'NOT AN ADMIN or STAFF' });
    }

    const booking = await  Booking.findById(bookingId);

    booking.paymentStatus = 'Cancelled';
    booking.save();

});

module.exports = router;