import { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';

interface PasswordResponse {
  token: string;
}

export default function CreditRequest() {
  const [telefono, setTelefono] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');

  const handleRequestOtp = async () => {
    try {
      await axios.post('http://localhost:4000/api/auth/request-otp', { telefono });
      setStep(2);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al solicitar OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await axios.post('http://localhost:4000/api/auth/verify-otp', { telefono, otp });
      setStep(3);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'OTP inválido');
    }
  };

  const handleSetPassword = async () => {
    try {
      const res = await axios.post<PasswordResponse>(
        'http://localhost:4000/api/auth/set-password',
        { telefono, password } // ✅ corregido: antes era "contraseña"
      );

      localStorage.setItem('token', res.data.token);
      setError('');
      alert('Usuario creado y autenticado');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al crear contraseña');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>Solicitar Crédito</Typography>

      {step === 1 && (
        <>
          <TextField
            label="Número de celular"
            fullWidth
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" fullWidth onClick={handleRequestOtp}>Solicitar OTP</Button>
        </>
      )}

      {step === 2 && (
        <>
          <TextField
            label="Código OTP"
            fullWidth
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" fullWidth onClick={handleVerifyOtp}>Verificar OTP</Button>
        </>
      )}

      {step === 3 && (
        <>
          <TextField
            label="Crear Contraseña"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" fullWidth onClick={handleSetPassword}>Finalizar Registro</Button>
        </>
      )}

      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
    </Box>
  );
}
