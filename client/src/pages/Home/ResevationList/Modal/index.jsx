import React from "react";
import ReservationDetails from "../ReservationDetails";

export default function Modal({ reservation, setReservation }) {
  const closeModal = () => {
    setReservation(undefined);
  };

  if (reservation) {
    return (
      <div
        className="flex items-center justify-center z-50 w-screen h-screen bg-gray-900 bg-opacity-75 fixed bottom-0 left-0 "
      >
        <ReservationDetails reservation={reservation} closeModal={closeModal}/>
      </div>
    );
  }
}
