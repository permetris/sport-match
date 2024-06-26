import React, { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";
import Container from "../../components/Container";
import { ReservationList } from "../Home/ResevationList";
import {
  useLazyGetUserHistoryQuery,
  useGetUserQuery,
} from "../../slices/apiSlice";
import { useNavigate, useParams } from "react-router-dom";

export const UserHistory = () => {
  const { user } = useAuth();
  const params = useParams();
  const navigate = useNavigate();

  const { data: fetchedUser, isSuccess } = useGetUserQuery(params.username);
  const [reservations, setReservations] = useState();
  const [getUserHistory, { data}] =
    useLazyGetUserHistoryQuery();

  useEffect(async () => {
    if (!user) {
      return navigate("/login");
    }
    if (isSuccess) {
     await getUserHistory(fetchedUser.data._id).unwrap();
    }
  }, []);
  useEffect(() => {
    setReservations(data);
  }, [data]);

  return (
    <Container>
      <ReservationList reservations={reservations} />
    </Container>
  );
};
