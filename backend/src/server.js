import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import matchingRoutes from './routes/matchingRoutes.js';
import exchangeRoutes from './routes/exchangeRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', app: 'SkillSync API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/matches', matchingRoutes);
app.use('/api/exchanges', exchangeRoutes);

const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/skillsync').then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
