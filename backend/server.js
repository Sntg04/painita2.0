// backend/server.js
import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// Resolver __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Ruta de prueba para verificar backend
app.get('/api/status', (req, res) => {
  res.json({ ok: true, message: 'Painita backend activo 💎' });
});

// Fallback para SPA (React/Vite)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Painita corriendo en puerto ${PORT}`);
});
