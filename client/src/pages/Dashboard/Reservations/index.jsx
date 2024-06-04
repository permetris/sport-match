import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import { useLazyGetReservationsQuery } from "../../../slices/apiSlice";
import { reservationTableSettings } from "./settings";
import Pagination from "../../../components/Pagination";

export default function Reservations() {
  const [page, setPage] = useState(1);
  const [getReservations, { data }] = useLazyGetReservationsQuery();

  const editEntry = (event) => {
    console.log("editing");
  };
  const deleteEntry = (id) => {
    console.log("deleting" + id);
  };
  const addEntry = () => {
    console.log("adding");
  };
  useEffect(() => {
    getReservations({ page });
  },[page]);
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
    </>
  );
}
