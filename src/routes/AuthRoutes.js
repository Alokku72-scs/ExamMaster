import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import LoginFormDemo from '../components/LoginFormDemo';
import Signup from '../pages/Signup';

const AuthRoutes = ({ setUser }) => {
  return (
    <Routes>
      <Route path="/login" element={<Login setUser={setUser} />}/>
      <Route path="/signup" element={<Signup setUser={setUser} />} />
    </Routes>
  );
};

export default AuthRoutes;
