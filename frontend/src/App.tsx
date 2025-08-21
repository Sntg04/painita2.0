// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreditRequest from './pages/credit-request';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/credit-request" element={<CreditRequest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
