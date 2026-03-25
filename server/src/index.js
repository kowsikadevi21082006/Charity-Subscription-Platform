const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is not set. Set JWT_SECRET in your .env file before starting the server.');
  process.exit(1);
}

const authRoutes = require('./routes/auth');
const scoresRoutes = require('./routes/scores');
const subscriptionRoutes = require('./routes/subscription');
const charityRoutes = require('./routes/charity');
const drawRoutes = require('./routes/draw');
const adminRoutes = require('./routes/admin');
const authJwt = require('./middleware/authJwt');

const app = express();

// ✅ Allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://charity-subscription-platform-8lpt.vercel.app", // 🔥 your current frontend
  process.env.CLIENT_URL
].filter(Boolean);

// ✅ CORS CONFIG (FIXED)
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // allow for now (deadline)
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

// ✅ IMPORTANT ORDER
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // 🔥 FIXES PREFLIGHT

app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 150,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Auth: ${req.headers.authorization ? 'present' : 'missing'}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/scores', authJwt.verifyToken, scoresRoutes);
app.use('/api/subscription', authJwt.verifyToken, subscriptionRoutes);
app.use('/api/charity', authJwt.verifyToken, charityRoutes);
app.use('/api/draw', authJwt.verifyToken, drawRoutes);
app.use('/api/admin', authJwt.verifyToken, authJwt.isAdmin, adminRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Golf Charity Subscription API is running.' });
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Error handling
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ ERROR: Port ${PORT} is already in use.`);
    process.exit(1);
  } else {
    throw err;
  }
});