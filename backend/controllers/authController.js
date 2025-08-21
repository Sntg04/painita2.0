import pool from '../db.js';
import { sendOtpSMS } from '../utils/sendOtp.js';

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Solicita un OTP, lo guarda en la base de datos y lo envía por SMS.
 */
export async function requestOtp(req, res) {
  const { telefono } = req.body;

  if (!telefono || !/^\d{10}$/.test(telefono)) {
    return res.status(400).json({ error: 'Número de celular inválido. Debe tener 10 dígitos numéricos.' });
  }

  const otp = generateOtp();
  console.log(`📲 OTP para ${telefono}: ${otp}`);

  try {
    await pool.query(
      `INSERT INTO usuarios (telefono, otp, otp_expires_at)
       VALUES ($1, $2, NOW() + INTERVAL '5 minutes')
       ON CONFLICT (telefono)
       DO UPDATE SET otp = EXCLUDED.otp, otp_expires_at = EXCLUDED.otp_expires_at`,
      [telefono, otp]
    );

    await sendOtpSMS(telefono, otp);

    res.status(200).json({ message: 'OTP enviado exitosamente' });
  } catch (err) {
    console.error('❌ Error al enviar OTP:', err);
    res.status(500).json({ error: 'No se pudo enviar el OTP' });
  }
}

/**
 * Verifica el OTP ingresado por el usuario contra la base de datos.
 */
export async function verifyOtp(req, res) {
  const { telefono, otp } = req.body;

  if (!telefono || !otp) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  try {
    const result = await pool.query(
      `SELECT otp, otp_expires_at
       FROM usuarios
       WHERE telefono = $1`,
      [telefono]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const { otp: storedOtp, otp_expires_at } = result.rows[0];

    if (storedOtp !== otp) {
      return res.status(401).json({ error: 'OTP inválido' });
    }

    if (new Date() > otp_expires_at) {
      return res.status(410).json({ error: 'OTP expirado' });
    }

    return res.status(200).json({ message: 'OTP válido' });
  } catch (err) {
    console.error('❌ Error al verificar OTP:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

/**
 * Establece la contraseña del usuario después de verificar el OTP.
 */
export async function setPassword(req, res) {
  const { telefono, password } = req.body;

  if (!telefono || !password) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  try {
    // Si decides usar bcrypt:
    // import bcrypt from 'bcrypt';
    // const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `UPDATE usuarios
       SET contraseña = $1
       WHERE telefono = $2`,
      [password, telefono] // ✅ usa "contraseña" como nombre de columna
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Simulación de token (puedes usar JWT aquí si lo deseas)
    const token = 'fake-token-' + telefono;

    return res.status(200).json({ message: 'Contraseña establecida correctamente', token });
  } catch (err) {
    console.error('❌ Error al establecer contraseña:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}
