import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRouter from '../components/PrivateRouter';
import StudentDashboard from '../pages/StudentDashboard';

const StudentRoutes = ({ isLoggedIn, userRole }) => {
  return
  (
    <Routes>
      <Route path="/student-dashboard" element={
        <PrivateRouter isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['Student']}>
          <StudentDashboard />
        </PrivateRouter>
      } />
    </Routes>
  );
};

export default StudentRoutes;
