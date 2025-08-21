import pool from '../db.js';

export async function verifyOtp(req, res) {
  const { telefono, otp } = req.body;

  if (!telefono || !otp) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  try {
    const result = await pool.query(
      `SELECT otp, otp_expires_at FROM usuarios WHERE telefono = $1`,
      [telefono]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const { otp: storedOtp, otp_expires_at } = result.rows[0];

    if (!storedOtp) {
      return res.status(410).json({ error: 'OTP no generado o ya verificado' });
    }

    const now = new Date();
    const expiresAt = new Date(otp_expires_at);

    if (now > expiresAt) {
      return res.status(410).json({ error: 'OTP expirado' });
    }

    if (storedOtp !== otp) {
      return res.status(401).json({ error: 'OTP inválido' });
    }

    // OTP válido: limpiar campos
    await pool.query(
      `UPDATE usuarios SET otp = NULL, otp_expires_at = NULL WHERE telefono = $1`,
      [telefono]
    );

    return res.status(200).json({ message: 'OTP válido' });
  } catch (err) {
    console.error('Error al verificar OTP:', err);
    return res.status(500).json({ error: 'Error interno al verificar OTP' });
  }
}
