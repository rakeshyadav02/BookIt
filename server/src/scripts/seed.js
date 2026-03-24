import mongoose from 'mongoose';
import Experience from '../models/Experience.js';
import Slot from '../models/Slot.js';
import connectDB from '../config/db.js';
import sampleExperiences from '../data/seedExperiences.js';
import { env } from '../config/env.js';

// Load dotenv if available (safe when running without installing dotenv)
try {
  const dotenv = await import('dotenv');
  dotenv.config?.();
} catch (err) {
  console.warn('dotenv not found — continuing without .env (seed script)');
}

const timeSlots = env.seedTimeSlots;

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Experience.deleteMany({});
    await Slot.deleteMany({});

    console.log('🗑️  Cleared existing data');

    // Create experiences
    const createdExperiences = await Experience.insertMany(sampleExperiences);
    console.log(`✅ Created ${createdExperiences.length} experiences`);

    // Create slots for each experience
    let totalSlots = 0;
    for (const experience of createdExperiences) {
      const slots = [];
      for (const date of experience.availableDates) {
        for (const time of timeSlots) {
          slots.push({
            experienceId: experience._id,
            date,
            time,
            isBooked: false,
          });
        }
      }
      const createdSlots = await Slot.insertMany(slots);
      totalSlots += createdSlots.length;
    }

    console.log(`✅ Created ${totalSlots} slots`);
    console.log('🎉 Database seeded successfully!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
