import React from "react";

import Container from "../../components/Container";
import { ReservationList } from "../Home/ResevationList";
import { useGetUserHistoryQuery } from "../../slices/apiSlice";
import { useParams } from "react-router-dom";

export const UserHistory = () => {
  const params = useParams();

  const { data } = useGetUserHistoryQuery(params.username);

  return (
    <Container>
      <ReservationList reservations={data} />
    </Container>
  );
};
