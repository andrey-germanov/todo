import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "antd";
import React from "react";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    <>
        <Button onClick={() => logout({ returnTo: window.location.origin })}>
          Log Out
        </Button>
    </>
  );
};

export default LogoutButton;