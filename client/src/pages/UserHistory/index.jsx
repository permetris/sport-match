import React from "react";

import { useAuth } from "../../context/AuthContext";
import Container from "../../components/Container";
import { ReservationList } from "../Home/ResevationList";


export const UserHistory = () => {
  const { user } = useAuth();

  return (
    <Container>
      <ReservationList />
    </Container>
  );
};
