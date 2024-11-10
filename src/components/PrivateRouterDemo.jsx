import React from 'react';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const PrivateRouterDemo = () => {
  
    const location = useLocation();
    const isVisited = location.state?.isVisited || false; 

  if (isVisited) {
    return <Navigate to="/demologin" />;
  }

  return <Navigate to="/quiz"/>;
};

export default PrivateRouterDemo;

