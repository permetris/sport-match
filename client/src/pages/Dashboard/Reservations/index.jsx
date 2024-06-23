import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import { useLazyGetReservationsQuery } from "../../../slices/apiSlice";
import { reservationTableSettings } from "./settings";
import Pagination from "../../../components/Pagination";
import { AddReservationModal } from "./AddReservation";

export default function Reservations() {
  const [isAddReservation, setIsAddReservation] = useState(false);
  const [page, setPage] = useState(1);
  const [getReservations, { data }] = useLazyGetReservationsQuery();

  const editEntry = (event) => {
    console.log("editing");
  };
  const deleteEntry = (id) => {
    console.log("deleting" + id);
  };
  const addEntry = () => {
    setIsAddReservation(true);

  };
  useEffect(() => {
    getReservations({ page });
  }, [page]);
  return (
    <>
      <Table
        data={data?.data}
        settings={reservationTableSettings}
        editEntry={editEntry}
        deleteEntry={deleteEntry}
        addEntry={addEntry}
      />
      <Pagination
        totalItems={data?.totalItems}
        page={page}
        setPage={setPage}
      ></Pagination>
      {isAddReservation && (
        <AddReservationModal setIsAddReservation={setIsAddReservation} />
      )}
    </>
  );
}
