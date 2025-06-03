import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MockupEditor from './pages/MockupEditor';
import LandingPage from './pages/LandingPage'; // add this at the top

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/editor" element={<MockupEditor />} />
            <Route path="/home" element={<Home />} /> {/* optional legacy/home */}
        </Routes>
</Router>

  );
}

export default App;
