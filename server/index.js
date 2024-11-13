import express from 'express';
import cors from 'cors';
import { initDb } from './db/init.js';
import feedingRoutes from './routes/feeding.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Initialize database
await initDb();

// API Routes
app.use('/api/feeding', feedingRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});