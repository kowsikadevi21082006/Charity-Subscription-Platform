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

app.use(helmet());
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174'
].filter(Boolean);

app.use(cors({ origin: allowedOrigins, credentials: true }));
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

// Add logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Auth: ${req.headers.authorization ? 'present' : 'missing'}`);
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/scores', authJwt.verifyToken, scoresRoutes);
app.use('/api/subscription', authJwt.verifyToken, subscriptionRoutes);
app.use('/api/charity', authJwt.verifyToken, charityRoutes);
app.use('/api/draw', authJwt.verifyToken, drawRoutes);
app.use('/api/admin', authJwt.verifyToken, authJwt.isAdmin, adminRoutes);

app.get('/', (req, res) => res.json({ message: 'Golf Charity Subscription API is running.' }));

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ ERROR: Port ${PORT} is already in use.`);
    console.error('\nFix: Kill the process using this command:');
    console.error(`  netstat -ano | findstr :${PORT}`);
    console.error(`  taskkill /PID <PID> /F`);
    console.error('\nOr change PORT in .env file\n');
    process.exit(1);
  } else {
    throw err;
  }
});
