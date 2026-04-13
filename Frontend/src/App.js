import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Aceboard from './Pages/Aceboard';
import Leetcode from './Pages/Leetcode';
import Gfg from './Pages/Gfg';
import Codeforces from './Pages/Codeforces';
import Leaderboard from './Pages/Home';
import MainPage from './Pages/MainPage';
import RegisterPage from './Pages/RegisterPage';
import AuthLandingPage from './Pages/AuthLandingPage'; 

// import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('studentId')) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Landing page with Login/Register options */}
          <Route path="/" element={<AuthLandingPage />} />

          {/* Auth Routes */}
          <Route path="/register" element={<RegisterPage />} />

          {/* Student Routes */}
          <Route path="/main" element={isAuthenticated ? <MainPage /> : <AuthLandingPage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/aceboard" element={<Aceboard />} />
          <Route path="/leetcode" element={<Leetcode />} />
          <Route path="/gfg" element={<Gfg />} />
          <Route path="/codeforces" element={<Codeforces />} />
          <Route exact path="/student" element={<StudentDashboardWrapper />} />

          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
