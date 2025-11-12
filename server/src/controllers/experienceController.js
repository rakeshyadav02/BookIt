import Experience from '../models/Experience.js';
import Slot from '../models/Slot.js';

export const getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: experiences,
      message: 'Experiences fetched successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching experiences',
    });
  }
};

export const getExperienceById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const experience = await Experience.findById(id);
    
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found',
      });
    }

    // Get all slots for this experience
    const slots = await Slot.find({ experienceId: id });
    
    // Organize slots by date
    const slotsByDate = {};
    slots.forEach(slot => {
      if (!slotsByDate[slot.date]) {
        slotsByDate[slot.date] = [];
      }
      slotsByDate[slot.date].push({
        _id: slot._id,
        time: slot.time,
        isBooked: slot.isBooked,
      });
    });

    res.status(200).json({
      success: true,
      data: {
        experience,
        slots: slotsByDate,
      },
      message: 'Experience details fetched successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching experience details',
    });
  }
};



