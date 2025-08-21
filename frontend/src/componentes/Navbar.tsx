// src/componentes/Navbar.tsx
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';

const red = '#D72638';
const white = '#FFFFFF';

const sections = [
  { label: 'Inicio', to: 'hero' },
  { label: 'Calculadora', to: 'calculadora' },
  { label: '¿Quiénes somos?', to: 'quienes' },
  { label: 'Misión', to: 'mision' },
  { label: 'Visión', to: 'vision' },
  { label: 'Testimonios', to: 'testimonios' },
];

export default function Navbar() {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: red }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Painita
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {sections.map(({ label, to }) => (
            <ScrollLink
              key={to}
              to={to}
              smooth={true}
              duration={500}
              offset={-70}
              style={{ textDecoration: 'none' }}
            >
              <Button sx={{ color: white, textTransform: 'none' }}>{label}</Button>
            </ScrollLink>
          ))}
          <RouterLink to="/credit-request" style={{ textDecoration: 'none' }}>
            <Button sx={{ color: white, textTransform: 'none' }}>Solicitar crédito</Button>
          </RouterLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
