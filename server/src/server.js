// Load environment variables if dotenv is available (safe fallback if not installed)
try {
  // top-level await is supported with ESM modules
  const dotenv = await import('dotenv');
  dotenv.config?.();
} catch (err) {
  console.warn('dotenv not found or failed to load — continuing without .env');
}

// Import app and DB after attempting to load env vars so they can read process.env
const { default: app } = await import('./app.js');
const { default: connectDB } = await import('./config/db.js');
const { env } = await import('./config/env.js');

// Connect to database
connectDB();

// Start server
app.listen(env.port, () => {
  console.log(`Server is running on port ${env.port}`);
});



