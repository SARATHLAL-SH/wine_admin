// components/ProtectedRoute.js
import React,{useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    console.log("isAuthenticated in protected Route from useEffect",isAuthenticated)
  }, [isAuthenticated]);

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
