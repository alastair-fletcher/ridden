import { BikesProvider } from './context/BikeContext';
import { Home } from './pages/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export const App = () => {
  return (
    <BikesProvider>
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="test" element={<h1>hehehe</h1>} />
          </Routes>
        </BrowserRouter>
      </Container>
    </BikesProvider>
  );
};
