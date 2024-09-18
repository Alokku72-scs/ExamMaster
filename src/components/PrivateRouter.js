import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRouter = ({ user, allowedRoles, children }) => {
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRouter;
