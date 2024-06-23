// File: PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("userData"); // Giả sử bạn lưu token xác thực trong localStorage

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
