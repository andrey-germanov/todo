import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "antd";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <>
      {
        !isAuthenticated && 
        <Button onClick={() => loginWithRedirect({ returnTo: window.location.origin })}>
          Log In
        </Button>
      }
    </>
  );
};

export default LoginButton;