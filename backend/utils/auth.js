// utils/auth.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export function generateToken(usuarioId) {
  return jwt.sign({ id: usuarioId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}
