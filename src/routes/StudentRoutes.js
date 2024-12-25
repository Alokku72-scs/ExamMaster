import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StudentDashboard from '../pages/StudentDashboard';
import PrivateRouter from '../components/PrivateRouter';
import ActiveExamLogin from '../components/AcitveExamLogin';
import ActiveExamInstruction from '../pages/ActiveExamInstruction';
import ActivePaper from '../components/ActivePaper';

const StudentRoutes = ({ isLoggedIn, userRole }) => {
  return (
    <Routes>
      <Route path="/student-dashboard" element={
        <PrivateRouter isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['Student']}>
          <StudentDashboard />
        </PrivateRouter>}
      />
      <Route path="/active-exam-login" element={
        <PrivateRouter isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['Student']}>
          <ActiveExamLogin/>
        </PrivateRouter>
      }/>
      <Route path="/active-exam-instruction" element={
        <PrivateRouter isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['Student']}>
          <ActiveExamInstruction />
        </PrivateRouter>
      }/>
      <Route path="/active-exam-paper" element={
        <PrivateRouter isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['Student']}>
          <ActivePaper />
        </PrivateRouter>
      }/>

    </Routes>
  )
};

export default StudentRoutes;
