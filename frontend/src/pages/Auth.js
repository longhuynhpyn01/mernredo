import React, { Fragment } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { useAuth } from "../contexts/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import { Navigate } from "react-router-dom";

const Auth = ({ authRoute }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useAuth();
  let body;

  if (authLoading)
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );
  else if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  else
    body = (
      <Fragment>
        {authRoute === "login" && <LoginForm></LoginForm>}
        {authRoute === "register" && <RegisterForm></RegisterForm>}
      </Fragment>
    );

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>LearnIt</h1>
          <h4>Keep track of what you are learning</h4>
          {body}
        </div>
      </div>
    </div>
  );
};

export default Auth;
