import React from "react";
import ReservationDetails from "../ReservationDetails";

export default function Modal({ reservationId, setReservationId }) {
  const closeModal = () => {
    setReservationId(undefined);
  };

  if (reservationId) {
    return (
      <div
        className="flex items-center justify-center z-50 w-screen h-screen bg-gray-900 bg-opacity-75 fixed bottom-0 left-0 "
      >
        <ReservationDetails reservationId={reservationId} closeModal={closeModal}/>
      </div>
    );
  }
}
