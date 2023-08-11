import './css/App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route,HashRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MeditationPage from './pages/MeditationPage';
import {  } from 'react-router-dom';
function App() {
  return (
<HashRouter >
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/meditation" element={<MeditationPage />} />
  </Routes>
</HashRouter>
  );
}

export default App;
