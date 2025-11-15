import mongoose from 'mongoose';
import Experience from '../models/Experience.js';
import Slot from '../models/Slot.js';
import connectDB from '../config/db.js';

// Load dotenv if available (safe when running without installing dotenv)
try {
  const dotenv = await import('dotenv');
  dotenv.config?.();
} catch (err) {
  console.warn('dotenv not found — continuing without .env (seed script)');
}

const sampleExperiences = [
  {
    title: 'Sunset Beach Tour',
    description: 'Experience the breathtaking beauty of a sunset on our exclusive beach tour. Includes guided walk, refreshments, and photography session.',
    shortDescription: 'Breathtaking sunset experience on a pristine beach with guided tour and refreshments.',
    price: 2500,
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800',
    ],
    availableDates: ['2024-02-15', '2024-02-16', '2024-02-17', '2024-02-18', '2024-02-19'],
  },
  {
    title: 'Mountain Hiking Adventure',
    description: 'Embark on an exciting mountain hiking adventure. Suitable for all fitness levels. Includes equipment, guide, and lunch.',
    shortDescription: 'Exciting mountain hiking adventure with equipment, guide, and lunch included.',
    price: 3500,
    images: [
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800',
    ],
    availableDates: ['2024-02-20', '2024-02-21', '2024-02-22', '2024-02-23', '2024-02-24'],
  },
  {
    title: 'City Heritage Walk',
    description: 'Discover the rich heritage of the city with our guided heritage walk. Visit historical landmarks and learn about local culture.',
    shortDescription: 'Discover city heritage with guided walk through historical landmarks and cultural sites.',
    price: 1500,
    images: [
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800',
      'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800',
    ],
    availableDates: ['2024-02-25', '2024-02-26', '2024-02-27', '2024-02-28', '2024-02-29'],
  },
  {
    title: 'Wildlife Safari',
    description: 'Experience wildlife in its natural habitat. Morning and evening safaris available. Includes transportation and guide.',
    shortDescription: 'Wildlife safari experience in natural habitat with morning and evening options.',
    price: 4500,
    images: [
      'https://images.unsplash.com/photo-1544923408-75c5cef46f14?w=800',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
    ],
    availableDates: ['2024-03-01', '2024-03-02', '2024-03-03', '2024-03-04', '2024-03-05'],
  },
  {
    title: 'Cooking Class Experience',
    description: 'Learn to cook local delicacies with our expert chefs. Includes ingredients, recipes, and a delicious meal.',
    shortDescription: 'Learn to cook local delicacies with expert chefs in a hands-on cooking class.',
    price: 2000,
    images: [
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800',
      'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800',
    ],
    availableDates: ['2024-03-06', '2024-03-07', '2024-03-08', '2024-03-09', '2024-03-10'],
  },
];

const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

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
