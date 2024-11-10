import React from 'react';
import { Route,Routes } from 'react-router-dom';
import PrivateRouter from '../components/PrivateRouter';
import AdminDashboard from '../pages/AdminDashboard';
import Instruction from '../pages/Instruction';
import CreateExam from '../pages/ExamCreation';

const AdminRoutes = ({ isLoggedIn, userRole }) => {
  return (
    <Routes>
      <Route path="/admin-dashboard" element={
        <PrivateRouter isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['admin']}>
          <AdminDashboard />
        </PrivateRouter>
      } />
      <Route path="/instruction" element={
        <PrivateRouter isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['admin']}>
          <Instruction />
        </PrivateRouter>
      } />
      <Route path="/admin/create-exam" element={
        <PrivateRouter isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['admin']}>
          <CreateExam />
        </PrivateRouter>
      } />
    </Routes>
  );
};


export default AdminRoutes;
