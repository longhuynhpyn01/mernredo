import React, { Fragment } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import NavbarMenu from "../layout/NavbarMenu";

// để check trong component Dashboard thì user logging hay chưa nếu chưa logging thì redirect sang Login
const ProtectedRoute = ({ children }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useAuth();

  if (authLoading)
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );

  return isAuthenticated ? (
    <Fragment>
      <NavbarMenu></NavbarMenu>
      {children}
    </Fragment>
  ) : (
    <Navigate to="/login"></Navigate>
  );
};

export default ProtectedRoute;
