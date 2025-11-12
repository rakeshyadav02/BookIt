import Booking from '../models/Booking.js';
import Slot from '../models/Slot.js';
import Experience from '../models/Experience.js';
import { calculateDiscount } from '../utils/promoCodes.js';

export const createBooking = async (req, res) => {
  let booking = null;
  try {
    const { experienceId, slotId, userInfo, selectedSlot, promoCode } = req.body;

    // Validate required fields
    if (!experienceId || !slotId || !userInfo || !selectedSlot) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    // Validate user info
    if (!userInfo.name || !userInfo.email || !userInfo.phone) {
      return res.status(400).json({
        success: false,
        message: 'Missing user information',
      });
    }

    // Check if experience exists
    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found',
      });
    }

    // Check if slot exists and is available
    const slot = await Slot.findById(slotId);
    if (!slot) {
      return res.status(404).json({
        success: false,
        message: 'Slot not found',
      });
    }

    if (slot.isBooked) {
      return res.status(400).json({
        success: false,
        message: 'Slot is already booked',
      });
    }

    // Verify slot belongs to experience
    if (slot.experienceId.toString() !== experienceId) {
      return res.status(400).json({
        success: false,
        message: 'Slot does not belong to this experience',
      });
    }

    // Calculate pricing
    const originalPrice = experience.price;
    const discount = promoCode ? calculateDiscount(promoCode, originalPrice) : 0;
    const totalPrice = Math.max(0, originalPrice - discount);

    // Create and save booking first
    booking = new Booking({
      experienceId,
      slotId,
      userInfo,
      selectedSlot,
      totalPrice,
      originalPrice,
      promoCode: promoCode || null,
      discount,
      status: 'confirmed',
    });

    await booking.save();

    // Mark slot as booked after successful booking creation
    slot.isBooked = true;
    await slot.save();

    // Populate experience and slot details
    await booking.populate('experienceId', 'title');
    await booking.populate('slotId', 'date time');

    res.status(201).json({
      success: true,
      data: booking,
      message: 'Booking created successfully',
    });
  } catch (error) {
    // If booking was created but slot update failed, try to delete the booking
    if (booking && booking._id) {
      try {
        await Booking.findByIdAndDelete(booking._id);
      } catch (deleteError) {
        // Log but don't throw - the main error is more important
        console.error('Failed to rollback booking:', deleteError);
      }
    }
    
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating booking',
    });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const booking = await Booking.findById(id)
      .populate('experienceId', 'title description images')
      .populate('slotId', 'date time');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
      message: 'Booking fetched successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching booking',
    });
  }
};

