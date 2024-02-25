import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import authService from '../../services/authService';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authService.isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
