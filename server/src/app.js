import express from 'express';
import cors from 'cors';
import experienceRoutes from './routes/experienceRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import promoRoutes from './routes/promoRoutes.js';
import { errorHandler, notFound } from './middlewares/errorHandler.js';

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend.vercel.app'
  ]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'BookIt API Server',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      experiences: '/api/experiences',
      bookings: '/api/bookings',
      promo: '/api/promo',
    }
  });
});

app.use('/api/experiences', experienceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/promo', promoRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
  });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;

