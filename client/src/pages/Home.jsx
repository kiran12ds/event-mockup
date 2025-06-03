// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div style={{ textAlign: 'center', marginTop: '4rem' }}>
    <h1>Balloon Mockup App</h1>
    <Link to="/editor">Start Designing</Link>
  </div>
);

export default Home;
