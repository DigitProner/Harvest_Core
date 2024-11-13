import dotenv from 'dotenv';
import { createClient } from '@libsql/client';

dotenv.config();

const db = createClient({
  url: process.env.DB_URL || 'file:local.db'
});

export default db;