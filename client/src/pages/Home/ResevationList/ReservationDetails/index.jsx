import React, { useEffect, useState } from "react";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";

import { PlayersList } from "./PlayersList";
import {
  useLazyGetReservationQuery,
  useUpdateReservationMutation,
} from "../../../../slices/apiSlice";
import { toastError } from "../../../../hooks/useToastify";

const statusColors = {
  canceled: "bg-red-50 text-red-700 ring-red-600/20",
  open: "bg-green-50 text-green-700 ring-green-600/20",
};

export default function ReservationDetails({ reservationId, closeModal }) {
  const [updateReservation] = useUpdateReservationMutation();
  const [getReservation, { data: reservation }] =
    useLazyGetReservationQuery(reservationId);

  useEffect(() => {
    getReservation({ id: reservationId });
  }, [reservationId]);

  const addPlayer = async (player, addPlayerTo) => {
    
    let updatedReservation = {};
    if (addPlayerTo === "registeredPlayers") {
      if (reservation.registeredPlayers.filter(each => each._id === player._id).length !== 0) {
        return toastError("")
       }

      updatedReservation = {
        ...reservation,
        registeredPlayers: [...reservation.registeredPlayers, player],
      };
    } else if (addPlayerTo === "blackTeam") {
      updatedReservation = {
        ...reservation,
        match: {
          ...reservation.match,
          blackTeam: {
            ...reservation.blackTeam,
            players: [...reservation.match.blackTeam.players, player],
          },
        },
      };
    } else {
      updatedReservation = {
        ...reservation,
        match: {
          ...reservation.match,
          whiteTeam: {
            ...reservation.whiteTeam,
            players: [...reservation.match.whiteTeam.players, player],
          },
        },
      };
    }

    try {
      const response = await updateReservation(updatedReservation).unwrap();
      if (response?.success === true) {
        getReservation({ id: reservationId });
      }
    } catch (error) {
      toastError(error);
    }
  };

  const removePlayer = async (playerId) => {
    const updatedReservation = {
      ...reservation,
      registeredPlayers: reservation.registeredPlayers.filter(
        (user) => user._id !== playerId
      ),
    };
    try {
      const response = await updateReservation(updatedReservation).unwrap();
      if (response?.success === true) {
        getReservation({ id: reservationId });
      }
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <div className="lg:col-start-3 lg:row-end-1">
      <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
        <dl className="flex flex-wrap">
          <div className="flex-auto pl-6 pt-6">
            <dt className="text-sm font-semibold leading-6 text-gray-900">
              {`${reservation?.field.city.name}, ${reservation?.field.address}`}
            </dt>
            <dd className="mt-1 text-base font-semibold leading-6 text-blue-900">
              {reservation?.openEntry ? "Free entry" : "All random"}
            </dd>
          </div>

          <div className="flex-none self-end px-6 pt-4">
            <dd
              className={`inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 ${statusColors[reservation?.status]}`}
            >
              {reservation?.status.toUpperCase()}
            </dd>
          </div>

          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dt className="flex-none">
              <CalendarDaysIcon
                className="h-6 w-5 text-gray-400"
                aria-hidden="true"
              />
            </dt>
            <dd className="text-sm leading-6 text-gray-500">
              <time dateTime="2023-01-31">
                {new Date(reservation?.time).toLocaleString()}
              </time>
            </dd>
          </div>

          {reservation?.openEntry && (
            <div className="mt-4 flex center w-full flex-none gap-x-4 px-6">
              <PlayersList
                players={reservation?.match?.blackTeam?.players}
                title={"Black Team"}
                removePlayer={removePlayer}
                addPlayer={addPlayer}
                action={"blackTeam"}
                capacity={reservation?.field.maxPlayers / 2}
              />
              <PlayersList
                players={reservation?.match?.whiteTeam?.players}
                title={"White Team"}
                removePlayer={removePlayer}
                addPlayer={addPlayer}
                action={"whiteTeam"}
                capacity={reservation?.field.maxPlayers / 2}
              />
            </div>
          )}
          {!reservation?.openEntry && (
            <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
              <PlayersList
                players={reservation?.registeredPlayers}
                title={"Registered players"}
                removePlayer={removePlayer}
                addPlayer={addPlayer}
                action={"registeredPlayers"}
                capacity={reservation?.field.maxPlayers}
              />
            </div>
          )}
        </dl>
        <div className=" mt-6 border-t border-gray-900/5 px-6 py-6">
          <button
            onClick={closeModal}
            className="text-sm font-semibold leading-6 text-red-900 text-danger pointer"
          >
            Close <span aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </div>
  );
}
