import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import Signup from '../pages/Signup';
import LoginFormDemo from '../components/LoginFormDemo';

const AuthRoutes = ({ setUser }) => {
  return (
    <Routes>
      <Route path="/auth/login" element={<LoginForm setUser={setUser} />} />
      <Route path="/signup" element={<Signup setUser={setUser} />} />
      <Route path="/demologin" element={<LoginFormDemo />} />
    </Routes>
  );
};

export default AuthRoutes;
