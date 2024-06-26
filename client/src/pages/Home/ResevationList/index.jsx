import React, { useState } from "react";
import Modal from "./Modal";

const formatCapacityString = (reservation) => {
  if (reservation.openEntry) {
    return `${reservation.match.blackTeam.players.length + reservation.match.whiteTeam.players.length}/${reservation.field.maxPlayers}`;
  }
  return `${reservation.registeredPlayers.length}/${reservation.field.maxPlayers}`;
};

export function ReservationList({ reservations }) {
  const [reservationId, setReservationId] = useState(undefined);

  if (!reservations || reservations.length == 0) {
    return (
      <div className="mt-10">
        <h1 className="text-center text-white font-bold text-3xl">
          No reservations
        </h1>
      </div>
    );
  }

  const openReservation = (id) => {
    setReservationId(id);
  };
  return (
    <div>
      <ul role="list" className="divide-y divide-white-800 mt-5">
        {reservations?.map((reservation) => (
          <li
            onClick={() => openReservation(reservation._id)}
            key={reservation._id}
            className="flex justify-between gap-x-6 py-3 hover:bg-sky-700 cursor-pointer"
          >
            <div className="flex min-w-0 gap-x-4 pl-3">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-white">
                  {reservation.field.city.name}
                </p>
                <p className="text-sm font-semibold leading-6 text-white">
                  {new Date(reservation.time).toUTCString()}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-400">
                  {reservation.field.address}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end pe-3">
              <p className="text-sm leading-6 text-sky-300">
                {reservation.openEntry ? "FREE ENTRY" : "ALL RANDOM"}
              </p>
              <div className="mt-1 flex items-center gap-x-1.5">
                <p className="text-s leading-5 text-gray-400">{`Capacity: ${formatCapacityString(reservation)} `}</p>
              </div>
              <div className="mt-1 flex items-center gap-x-1.5">
                <p className="text-s leading-5 text-gray-400">{`Id ${reservation.num}`}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Modal
        reservationId={reservationId}
        setReservationId={setReservationId}
      />
    </div>
  );
}
