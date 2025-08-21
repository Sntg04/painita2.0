// backend/app.js
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
import authRoutes from './routes/auth/index.js';
app.use('/api/auth', authRoutes);

app.listen(4000, () => {
  console.log('✅ Backend corriendo en http://localhost:4000');
});

import setPasswordRoute from './routes/auth/setPassword.js';

app.use('/api/auth/set-password', setPasswordRoute);
