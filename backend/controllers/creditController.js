import pool from '../db.js';

/**
 * Crea una solicitud de crédito para un usuario autenticado.
 * Requiere que el usuario haya verificado su OTP previamente.
 */
export async function creditRequest(req, res) {
  const { telefono, monto, plazo, motivo } = req.body;

  if (!telefono || !monto || !plazo || !motivo) {
    return res.status(400).json({ error: 'Datos incompletos para la solicitud de crédito' });
  }

  try {
    // Verificar que el usuario exista y haya verificado su OTP
    const userResult = await pool.query(
      `SELECT id FROM usuarios WHERE telefono = $1 AND otp IS NULL`,
      [telefono]
    );

    if (userResult.rows.length === 0) {
      return res.status(403).json({ error: 'Usuario no verificado o no registrado' });
    }

    const usuarioId = userResult.rows[0].id;

    // Insertar la solicitud de crédito
    await pool.query(
      `INSERT INTO creditos (usuario_id, monto, plazo, motivo, estado, fecha_solicitud)
       VALUES ($1, $2, $3, $4, $5, NOW())`,
      [usuarioId, monto, plazo, motivo, 'pendiente']
    );

    return res.status(201).json({ message: 'Solicitud de crédito registrada exitosamente' });
  } catch (err) {
    console.error('Error al registrar solicitud de crédito:', err);
    return res.status(500).json({ error: 'Error interno al registrar solicitud de crédito' });
  }
}
