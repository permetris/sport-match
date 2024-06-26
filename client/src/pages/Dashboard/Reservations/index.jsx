import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import {
  useDeleteReservationMutation,
  useLazyGetReservationsQuery,
} from "../../../slices/apiSlice";
import { reservationTableSettings } from "./settings";
import Pagination from "../../../components/Pagination";
import { AddReservationModal } from "./AddReservation";
import { toastError, toastSuccess } from "../../../hooks/useToastify";
import Modal from "../../Home/ResevationList/Modal";

export default function Reservations() {
  const [isAddReservation, setIsAddReservation] = useState(false);
  const [page, setPage] = useState(1);
  const [getReservations, { data }] = useLazyGetReservationsQuery();
  const [deleteReservation] = useDeleteReservationMutation();
  const [reservationId, setReservationId] = useState("");

  const editEntry = (event) => {
    console.log("editing");
  };
  const deleteEntry = async (id) => {
    try {
      const result = await deleteReservation(id).unwrap();
      if (result.success) {
        toastSuccess("Successfully deleted reservation");
        getReservations({ page });
      }
    } catch (error) {
      toastError(error);
    }
  };
  const addEntry = () => {
    setIsAddReservation(true);
  };
  useEffect(() => {
    getReservations({ page });
  }, [page]);
  const openModal = (id) => {
    setReservationId(id);
  };
  return (
    <>
      <Table
        data={data?.data}
        settings={reservationTableSettings}
        editEntry={editEntry}
        deleteEntry={deleteEntry}
        addEntry={addEntry}
        openModal={openModal}
      />
      <Pagination
        totalItems={data?.totalItems}
        page={page}
        setPage={setPage}
      ></Pagination>
      {isAddReservation && (
        <AddReservationModal
          setIsAddReservation={setIsAddReservation}
          getReservations={getReservations}
        />
      )}
      <Modal
        reservationId={reservationId}
        setReservationId={setReservationId}
      />
    </>
  );
}
