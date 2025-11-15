// Load environment variables if dotenv is available (safe fallback if not installed)
try {
  // top-level await is supported with ESM modules
  const dotenv = await import('dotenv');
  dotenv.config?.();
} catch (err) {
  console.warn('dotenv not found or failed to load — continuing without .env');
}

const PORT = process.env.PORT || 5000;

// Import app and DB after attempting to load env vars so they can read process.env
const { default: app } = await import('./app.js');
const { default: connectDB } = await import('./config/db.js');

// Connect to database
connectDB();

// Seed database on startup if in development mode
if (process.env.NODE_ENV !== 'production') {
  try {
    console.log('🌱 Seeding database...');
    await import('./scripts/seed.js');
  } catch (err) {
    console.warn('⚠️  Seeding failed:', err.message);
  }
}

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



