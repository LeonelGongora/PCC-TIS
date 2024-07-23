import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, requiredPermissionIndexes = [], adminOnly = false, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  const userPermissionsString = localStorage.getItem('userPermissions') || '';
  const userPermissions = userPermissionsString.split(',').map(Number);
  const isAdmin = localStorage.getItem('userRole') === 'admin';

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (adminOnly) {
    const hasPermission = requiredPermissionIndexes.some(index => userPermissions[index] === 1);
    if (!isAdmin && !hasPermission) {
      return <Navigate to="/unauthorized" />;
    }
  } else {
    const hasPermission = requiredPermissionIndexes.some(index => userPermissions[index] === 1);
    if (!isAdmin && !hasPermission) {
      return <Navigate to="/unauthorized" />;
    }
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;