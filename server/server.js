require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const registrationRoutes = require('./routes/registrationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const fileRoutes = require('./routes/fileRoutes');
const { connectToDatabase } = require('./db/connect');

const app = express();
const PORT = process.env.PORT || 5000;

// Security settings
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}));
app.use(express.json({ limit: '10mb' }));

// Rate limiting to prevent brute-force
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: { error: 'Too many requests from this IP, please try again later.' }
});

app.use('/api', limiter);
app.use('/api', registrationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', fileRoutes);

// Centralized error handling
app.use((err, req, res, next) => {
  console.error('[Error]:', err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

(async () => {
  console.log('--- Server starting ---');
  try {
    console.log('Connecting to database...');
    const conn = await connectToDatabase();
    console.log(`Successfully connected to MongoDB: ${conn.name}`);

    console.log(`Starting server on port ${PORT}...`);
    app.listen(PORT, () => {
      console.log(`--- Server running on port ${PORT} ---`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();
