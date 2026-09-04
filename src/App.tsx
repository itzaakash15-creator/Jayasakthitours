import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Packages } from './pages/Packages';
import { Itinerary } from './pages/Itinerary';
import { Gallery } from './pages/Gallery';
import { Reviews } from './pages/Reviews';
import { SubmitReview } from './pages/SubmitReview';
import { Booking } from './pages/Booking';
import { Contact } from './pages/Contact';

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/submit-review" element={<SubmitReview />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/plan-my-trip" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />
        {/* Fallback to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
