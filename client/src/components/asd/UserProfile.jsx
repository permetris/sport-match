import React from "react";
import { Container } from "react-bootstrap";
import { UserProfile } from "../../pages/UserProfile";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const UserProfilee = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (!user) {
    return navigate("/login");
  }
  return (
    <Container className="align-items-center justify-content-center">
      <UserProfile />
    </Container>
  );
};
