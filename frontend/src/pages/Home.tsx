// src/pages/Home.tsx
import { Box, Typography, Paper, Grid } from '@mui/material';
import { Element } from 'react-scroll';
import Navbar from '../componentes/Navbar';
import CalculadoraCredito from '../componentes/CalculadoraCredito';
import StarIcon from '@mui/icons-material/Star';
import { colores } from '../estilos/colores';

const { rojoPainita, negro, blanco, fondoOscuro } = colores;

const testimonios = [
  {
    texto: `“Me salvó en un momento crítico. La cuota fue un poco alta, pero necesitaba el dinero urgente para pagar una urgencia médica...”`,
    estrellas: 4,
  },
  {
    texto: `“Sí, cobran más que un banco… pero ningún banco te presta en 5 minutos...”`,
    estrellas: 5,
  },
  {
    texto: `“Los intereses son elevados, pero cuando uno está en apuros...”`,
    estrellas: 4,
  },
  {
    texto: `“No es la opción más barata, pero sí es la más rápida...”`,
    estrellas: 4,
  },
  {
    texto: `“Lo importante es pagar a tiempo. Si uno se organiza...”`,
    estrellas: 5,
  },
  {
    texto: `“Me pareció costoso al principio, pero después entendí...”`,
    estrellas: 4,
  },
];

export default function Home() {
  return (
    <Box sx={{ backgroundColor: fondoOscuro, color: blanco }}>
      <Navbar />

      {/* Hero */}
      <Element name="hero">
        <Box sx={{ py: 10, textAlign: 'center', background: `linear-gradient(145deg, ${negro}, ${rojoPainita})` }}>
          <Typography variant="h2" sx={{ fontWeight: 700, color: blanco }}>
            Painita
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            La gema del crédito instantáneo
          </Typography>
          <Typography variant="body1" sx={{ mt: 3, maxWidth: 700, mx: 'auto', opacity: 0.9 }}>
            Inspirada en una de las piedras más raras del mundo, Painita es tu solución rápida y confiable para emergencias financieras. Sin papeleos, sin esperas.
          </Typography>
        </Box>
      </Element>

      {/* Calculadora */}
      <Element name="calculadora">
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CalculadoraCredito />
        </Box>
      </Element>

      {/* ¿Quiénes somos? */}
      <Element name="quienes">
        <Box sx={{ maxWidth: 1000, mx: 'auto', px: 2, mb: 6 }}>
          <Paper elevation={4} sx={{ p: 5, backgroundColor: blanco, color: negro, borderRadius: 3, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ color: rojoPainita, fontWeight: 700, mb: 2 }}>
              ¿Quiénes somos?
            </Typography>
            <Typography variant="body1">
              En Painita creemos que el acceso al crédito debe ser tan transparente y valioso como una piedra preciosa...
            </Typography>
          </Paper>
        </Box>
      </Element>

      {/* Misión */}
      <Element name="mision">
        <Box sx={{ maxWidth: 1000, mx: 'auto', px: 2, mb: 6 }}>
          <Paper elevation={4} sx={{ p: 5, backgroundColor: blanco, color: negro, borderRadius: 3, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ color: rojoPainita, fontWeight: 700, mb: 2 }}>
              Misión
            </Typography>
            <Typography variant="body1">
              Democratizar el acceso al crédito digital en Colombia...
            </Typography>
          </Paper>
        </Box>
      </Element>

      {/* Visión */}
      <Element name="vision">
        <Box sx={{ maxWidth: 1000, mx: 'auto', px: 2, mb: 6 }}>
          <Paper elevation={4} sx={{ p: 5, backgroundColor: blanco, color: negro, borderRadius: 3, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ color: rojoPainita, fontWeight: 700, mb: 2 }}>
              Visión
            </Typography>
            <Typography variant="body1">
              Ser la plataforma de crédito más valiosa del país...
            </Typography>
          </Paper>
        </Box>
      </Element>

      {/* Testimonios */}
      <Element name="testimonios">
        <Box sx={{ py: 10, px: 2, backgroundColor: negro }}>
          <Typography variant="h4" sx={{ textAlign: 'center', color: blanco, mb: 6, fontWeight: 700 }}>
            Lo que dicen nuestros usuarios
          </Typography>
          <Grid container spacing={6} sx={{ maxWidth: 1000, mx: 'auto' }} justifyContent="center">
            {testimonios.map(({ texto, estrellas }, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper elevation={5} sx={{ p: 5, backgroundColor: blanco, color: negro, borderRadius: 3, textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, mb: 2 }}>
                    {[...Array(estrellas)].map((_, i) => (
                      <StarIcon key={i} sx={{ color: rojoPainita, fontSize: 20 }} />
                    ))}
                  </Box>
                  <Typography variant="body2" sx={{ fontStyle: 'italic' }}>{texto}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Element>
    </Box>
  );
}
