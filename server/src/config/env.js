const DEFAULT_PORT = 5000;
const DEFAULT_NODE_ENV = 'development';
const DEFAULT_MONGO_URI = 'mongodb://localhost:27017/bookit';
const DEFAULT_CORS_ORIGINS = ['http://localhost:3000'];
const DEFAULT_SEED_TIME_SLOTS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

const parseCsvList = (value) => {
  if (!value) {
    return [];
  }

  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

const toNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const env = {
  port: toNumber(process.env.PORT, DEFAULT_PORT),
  nodeEnv: process.env.NODE_ENV || DEFAULT_NODE_ENV,
  mongoUri: process.env.MONGODB_URI || DEFAULT_MONGO_URI,
  corsOrigins: parseCsvList(process.env.CORS_ORIGINS).length
    ? parseCsvList(process.env.CORS_ORIGINS)
    : DEFAULT_CORS_ORIGINS,
  seedTimeSlots: parseCsvList(process.env.SEED_TIME_SLOTS).length
    ? parseCsvList(process.env.SEED_TIME_SLOTS)
    : DEFAULT_SEED_TIME_SLOTS,
};
