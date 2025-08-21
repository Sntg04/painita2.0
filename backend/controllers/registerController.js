// controllers/registerController.js
import pool from '../db.js'; // Tu conexión a PostgreSQL
import { validateStep1 } from '../utils/validateFields.js';

export async function saveStep1(req, res) {
  const data = req.body;
  const errors = validateStep1(data);
  if (errors.length) return res.status(400).json({ errors });

  try {
    const result = await pool.query(`
      INSERT INTO usuarios (
        first_name, second_name, last_name, second_last_name,
        email, document_number, birth_date, document_issue_date,
        education_level, marital_status, gender, telefono
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
      RETURNING id
    `, [
      data.first_name, data.second_name, data.last_name, data.second_last_name,
      data.email, data.document_number, data.birth_date, data.document_issue_date,
      data.education_level, data.marital_status, data.gender, data.telefono
    ]);

    res.status(201).json({ userId: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al guardar datos personales' });
  }
}

// controllers/registerController.js
export async function saveStep2(req, res) {
  const { telefono, department, city, locality, address } = req.body;

  if (!telefono) return res.status(400).json({ error: 'Número de celular requerido' });

  try {
    await pool.query(`
      UPDATE usuarios SET
        department = $1,
        city = $2,
        locality = $3,
        address = $4
      WHERE telefono = $5
    `, [department, city, locality, address, telefono]);

    res.status(200).json({ message: 'Residencia actualizada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al guardar residencia' });
  }
}


// controllers/registerController.js
export async function saveReferences(req, res) {
  const {
    telefono,
    reference_one_name, reference_one_phone, reference_one_relationship,
    reference_two_name, reference_two_phone, reference_two_relationship
  } = req.body;

  try {
    const userRes = await pool.query(`SELECT id FROM usuarios WHERE telefono = $1`, [telefono]);
    if (!userRes.rows.length) return res.status(404).json({ error: 'Usuario no encontrado' });

    const userId = userRes.rows[0].id;

    await pool.query(`
      INSERT INTO referencias_usuario (usuario_id, nombre, telefono, relacion)
      VALUES ($1, $2, $3, $4), ($1, $5, $6, $7)
    `, [
      userId,
      reference_one_name, reference_one_phone, reference_one_relationship,
      reference_two_name, reference_two_phone, reference_two_relationship
    ]);

    res.status(201).json({ message: 'Referencias guardadas' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al guardar referencias' });
  }
}


// controllers/registerController.js
export async function saveDocumentFiles(req, res) {
  const { telefono } = req.body;
  const files = req.files;

  if (!telefono || !files?.id_front || !files?.id_back) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  try {
    const idFrontPath = files.id_front[0].path;
    const idBackPath = files.id_back[0].path;

    await pool.query(`
      UPDATE usuarios SET id_front = $1, id_back = $2 WHERE telefono = $3
    `, [idFrontPath, idBackPath, telefono]);

    res.status(200).json({ message: 'Documentos subidos correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al guardar documentos' });
  }
}

// controllers/registerController.js
export async function saveSelfie(req, res) {
  const { telefono } = req.body;
  const file = req.file;

  if (!telefono || !file) return res.status(400).json({ error: 'Datos incompletos' });

  try {
    await pool.query(`
      UPDATE usuarios SET selfie = $1 WHERE telefono = $2
    `, [file.path, telefono]);

    res.status(200).json({ message: 'Selfie subida correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al guardar selfie' });
  }
}


import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';

export async function saveSelfie(req, res) {
  const { telefono } = req.body;
  const file = req.file;

  if (!telefono || !file) return res.status(400).json({ error: 'Datos incompletos' });

  try {
    const selfieUrl = await uploadToCloudinary(file.path, 'painita_selfies');

    await pool.query(`
      UPDATE usuarios SET selfie = $1 WHERE telefono = $2
    `, [selfieUrl, telefono]);

    res.status(200).json({ message: 'Selfie subida a Cloudinary', url: selfieUrl });
  } catch (err) {
    res.status(500).json({ error: 'Error al subir selfie' });
  }
}


// controllers/registerController.js
export async function saveBankInfo(req, res) {
  const { telefono, bank_name, account_number } = req.body;

  if (!telefono || !bank_name || !account_number) {
    return res.status(400).json({ error: 'Datos bancarios incompletos' });
  }

  try {
    await pool.query(`
      UPDATE usuarios SET bank_name = $1, account_number = $2 WHERE telefono = $3
    `, [bank_name, account_number, telefono]);

    res.status(200).json({ message: 'Información bancaria guardada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al guardar datos bancarios' });
  }
}


// controllers/registerController.js
import { hashPassword, generateToken } from '../utils/auth.js';

export async function activateUser(req, res) {
  const { telefono, contraseña } = req.body;

  if (!telefono || !contraseña) {
    return res.status(400).json({ error: 'Teléfono y contraseña requeridos' });
  }

  try {
    const hashed = await hashPassword(contraseña);

    const result = await pool.query(`
      UPDATE usuarios SET contraseña = $1 WHERE telefono = $2 RETURNING id
    `, [hashed, telefono]);

    if (!result.rows.length) return res.status(404).json({ error: 'Usuario no encontrado' });

    const token = generateToken(result.rows[0].id);

    res.status(200).json({ message: 'Usuario activado', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al activar usuario' });
  }
}

// controllers/authController.js
import pool from '../db.js';

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function requestOtp(req, res) {
  const { telefono } = req.body;

  if (!telefono || !/^\d{10}$/.test(telefono)) {
    return res.status(400).json({ error: 'Número de celular inválido' });
  }

  const otp = generateOtp();
  console.log(`📲 OTP para ${telefono}: ${otp}`);

  try {
    const existing = await pool.query(`SELECT id FROM usuarios WHERE telefono = $1`, [telefono]);

    if (existing.rows.length) {
      await pool.query(`UPDATE usuarios SET otp = $1 WHERE telefono = $2`, [otp, telefono]);
    } else {
      await pool.query(`INSERT INTO usuarios (telefono, otp) VALUES ($1, $2)`, [telefono, otp]);
    }

    res.status(200).json({ message: 'OTP enviado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al generar OTP' });
  }
}

