import React, { useEffect, useState } from "react";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import { useAuth } from "../../../../context/AuthContext";

import { PlayersList } from "./PlayersList";
import {
  useLazyGetReservationQuery,
  useRemoveRegisteredPlayerMutation,
  useUpdateReservationMutation,
} from "../../../../slices/apiSlice";

const statusColors = {
  canceled: "bg-red-50 text-red-700 ring-red-600/20",
  open: "bg-green-50 text-green-700 ring-green-600/20",
};

export default function ReservationDetails({ reservationId, closeModal }) {
  const { user } = useAuth();
  const [showUserSearch, setShowUserSearch] = useState();
  const [removeRegisteredPlayer] = useRemoveRegisteredPlayerMutation();
  const [updateReservation] = useUpdateReservationMutation();
  const [getReservation, { data: reservation }] = useLazyGetReservationQuery(
    reservationId
  );

  useEffect(() => {
    getReservation({ id: reservationId });
  }, [reservationId]);
  const addPlayer = () => {};
  const removePlayer = async (playerId) => {
    const updatedReservation = {
      ...reservation,
      registeredPlayers: reservation.registeredPlayers.filter(
        (user) => user._id !== playerId,
      ),
    };
    const response = await updateReservation(updatedReservation).unwrap();
    console.log(response);
    if (response?.success === true) {
      getReservation({id:reservationId});
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
            <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
              <PlayersList
                players={reservation?.match?.blackTeam?.players}
                title={"Black Team"}
                removePlayer={removePlayer}
                addPlayer={addPlayer}
              />
              <PlayersList
                players={reservation?.match?.whiteTeam?.players}
                title={"White Team"}
                removePlayer={removePlayer}
                addPlayer={addPlayer}
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
