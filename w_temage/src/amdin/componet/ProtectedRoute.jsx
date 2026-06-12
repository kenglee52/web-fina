import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const admin = JSON.parse(localStorage.getItem('admin')); // ดึง object admin
  const role_name = admin?.role_name; // optional chaining

  if (!role_name || !allowedRoles.includes(role_name)) {
    return <Navigate to="/login_admin" replace />;
  }

  return children;
};

export default ProtectedRoute;
