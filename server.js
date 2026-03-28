import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import db from './config/db.js';
import userRoutes from './routes/user.routes.js';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/api/db-test', (req, res) => {
  db.query('SELECT 1', (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    res.json({ success: true, result });
  });
});

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});