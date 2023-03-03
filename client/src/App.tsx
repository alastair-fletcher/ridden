import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Nav } from './components/NavBar/Navbar';
import { Home } from './pages/Home/Home';
import { BikeDetails } from './pages/BikeDetails/BikeDetails';
import { UserProfile } from './pages/UserProfile/UserProfile';
import { AddBike } from './pages/AddBike/AddBike';
import { Likes } from './pages/Likes/Likes';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <Nav setSearchQuery={setSearchQuery} />
        <main>
          <Container>
            <Routes>
              <Route path="/" element={<Home searchQuery={searchQuery} />} />
              <Route path="/bikes/:bikeId" element={<BikeDetails />} />
              {/* TODO make this a private route - show modal*/}
              <Route path="/profile" element={<UserProfile />} />
              {/* TODO make this a private route - show modal*/}
              <Route path="/add-bike" element={<AddBike />} />
              {/* TODO make this a private route - show modal*/}
              <Route path="/likes" element={<Likes />} />
            </Routes>
          </Container>
        </main>
      </div>
    </BrowserRouter>
  );
};
