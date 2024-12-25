import React from 'react';
import { Route,Routes } from 'react-router-dom';
import PrivateRouter from '../components/PrivateRouter';
import AdminDashboard from '../pages/AdminDashboard';
import CreateExam from '../pages/CreateExam';
import ViewStudents from '../pages/ViewStudents';
import Reports from '../pages/Reports';

const AdminRoutes = ({ isLoggedIn, userRole }) => {
  return (
    <Routes>
      <Route path="/admin-dashboard" element={
        <PrivateRouter isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['Admin']}>
          <AdminDashboard />
        </PrivateRouter>
      }/>
      
      
      <Route path="/create-exam" element={
        <PrivateRouter isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['Admin']}>
          <CreateExam />
        </PrivateRouter>
      } />

      <Route path="/create-exam/:examId" element={
        <PrivateRouter isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['Admin']}>
          <CreateExam />
        </PrivateRouter>
      } />

      <Route path="/view-students" element={
        <PrivateRouter isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['Admin']}>
          <ViewStudents />
        </PrivateRouter>
      } />

      <Route path="reports" element={
        <PrivateRouter isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['Admin']}>
          <Reports/> 
        </PrivateRouter>
      }/>
    </Routes>
  );
};


export default AdminRoutes;
