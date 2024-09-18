import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRouter from './components/PrivateRouter';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Contact from './pages/Contact';
import MockTest from './pages/MockTest';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={(data) => { setIsLoggedIn(true); setUserRole(data.role); }} />} />
        <Route path="/signup" element={<Signup setUser={(data) => { setIsLoggedIn(true); setUserRole(data.role); }} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mock-test" element={<MockTest />} />

        <Route path="/admin-dashboard" element={
          <PrivateRouter isLoggedIn={isLoggedIn} allowedRoles={['admin', 'student']}>
            {userRole === 'admin' ? <AdminDashboard /> : <StudentDashboard />}
          </PrivateRouter>
        } />
      </Routes>
    </div>
  );
}

export default App;
