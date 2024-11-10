import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRouter = ({ isLoggedIn, userRole, allowedRoles, children }) => {
  console.log("isLoggedIn:", isLoggedIn);
  console.log("userRole:", userRole);
  console.log("allowedRoles:", allowedRoles);

  if (!isLoggedIn || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRouter;

