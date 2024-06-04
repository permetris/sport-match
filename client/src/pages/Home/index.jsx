import { React, useEffect, useState } from "react";
import { useLazyGetReservationsQuery } from "../../slices/apiSlice";
import ReservationList from "./ResevationList";
import Container from "../../components/Container";
import { ReservationFilters } from "./ReservationFilters";
import Pagination from "../../components/Pagination";

export const Home = () => {
  const [getReservations, { data: response }] = useLazyGetReservationsQuery();
  const [cityFilter, setCityFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    getReservations({ city: cityFilter, date: dateFilter, page });
  }, [cityFilter, dateFilter, page]);

  const resetFilters = () => {
    setCityFilter("");
    setDateFilter("");
  };

  return (
    <Container>
      <ReservationFilters
        resetFilters={resetFilters}
        setCityFilter={setCityFilter}
        setDateFilter={setDateFilter}
      />
      <ReservationList reservations={response?.data} />
      <Pagination
        totalItems={response?.totalItems}
        page={page}
        setPage={setPage}
      />
    </Container>
  );
};
