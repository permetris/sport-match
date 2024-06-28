import React, { useEffect, useState } from "react";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";

import { PlayersList } from "./PlayersList";
import {
  useLazyGetReservationQuery,
  useUpdateReservationMutation,
} from "../../../../slices/apiSlice";
import { toastError } from "../../../../hooks/useToastify";
import { toLocaleDate } from "../../../../utils/toLocaleDate";

const statusColors = {
  canceled: "bg-red-50 text-red-700 ring-red-600/20",
  open: "bg-green-50 text-green-700 ring-green-600/20",
};

export default function ReservationDetails({ reservationId, closeModal }) {
  const [updateReservation] = useUpdateReservationMutation();
  const [getReservation, { data: reservation, isSuccess }] =
    useLazyGetReservationQuery(reservationId);

  const [blackTeamScore, setBlackTeamScore] = useState(0);
  const [whiteTeamScore, setWhiteTeamScore] = useState(0);
  const [saveResult, setSaveResult] = useState(false);

  useEffect(() => {
    setWhiteTeamScore(
      reservation?.match.result.whiteTeamScore
        ? reservation?.match.result.whiteTeamScore
        : 0
    );
    setBlackTeamScore(
      reservation?.match.result.blackTeamScore
        ? reservation?.match.result.blackTeamScore
        : 0
    );
  }, [isSuccess]);

  useEffect(() => {
    getReservation({ id: reservationId });
  }, [reservationId]);

  const handleSaveResult = async () => {
    setSaveResult(false);
    try {
      const response = await updateReservation({
        ...reservation,
        match: {
          ...reservation.match,
          result: {
            ...reservation.match.result,
            blackTeamScore,
            whiteTeamScore,
          },
        },
      }).unwrap();
      if (response?.success === true) {
        await getReservation({ id: reservationId }).unwrap();
      }
    } catch (error) {
      toastError(error);
    }
  };

  const addPlayer = async (player, action) => {
    let updatedReservation = {};
    if (action === "registeredPlayers") {
      if (
        reservation.registeredPlayers.filter((each) => each._id === player._id)
          .length !== 0
      ) {
        toastError("Player already registered!");
        return;
      }

      updatedReservation = {
        ...reservation,
        registeredPlayers: [...reservation.registeredPlayers, player],
      };
    } else if (action === "blackTeam") {
      if (
        reservation.match.blackTeam.players.filter(
          (each) => each._id === player._id
        ).length !== 0
      ) {
        toastError("Player already registered!");
        return;
      }
      updatedReservation = {
        ...reservation,
        match: {
          ...reservation.match,
          blackTeam: {
            ...reservation.match.blackTeam,
            players: [...reservation.match.blackTeam.players, player],
          },
          whiteTeam: {
            ...reservation.match.whiteTeam,
            players: [
              ...reservation.match.whiteTeam.players.filter(
                (each) => each._id !== player._id
              ),
            ],
          },
        },
      };
    } else {
      if (
        reservation.match.whiteTeam.players.filter(
          (each) => each._id === player._id
        ).length !== 0
      ) {
        toastError("Player already registered!");
        return;
      }
      updatedReservation = {
        ...reservation,
        match: {
          ...reservation.match,
          whiteTeam: {
            ...reservation.whiteTeam,
            players: [...reservation.match.whiteTeam.players, player],
          },
          blackTeam: {
            ...reservation.match.blackTeam,
            players: [
              ...reservation.match.blackTeam.players.filter(
                (each) => each._id !== player._id
              ),
            ],
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

  const removePlayer = async (player, action) => {
    var updatedReservation = {};
    if (action === "registeredPlayers") {
      updatedReservation = {
        ...reservation,
        registeredPlayers: reservation.registeredPlayers.filter(
          (user) => user._id !== player._id
        ),
      };
    } else if (action === "blackTeam") {
      updatedReservation = {
        ...reservation,
        match: {
          ...reservation.match,
          blackTeam: {
            ...reservation.match.blackTeam,
            players: [
              ...reservation.match.blackTeam.players.filter(
                (each) => each._id !== player._id
              ),
            ],
          },
        },
      };
    } else {
      updatedReservation = {
        ...reservation,
        match: {
          ...reservation.match,
          whiteTeam: {
            ...reservation.match.whiteTeam,
            players: [
              ...reservation.match.whiteTeam.players.filter(
                (each) => each._id !== player._id
              ),
            ],
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

  return (
    <div className="lg:col-start-3 lg:row-end-1">
      {reservation && (
        <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
          <dl className="flex flex-wrap">
            <div className="flex-auto pl-6 pt-6">
              <dt className="text-sm font-semibold leading-6 text-gray-900">
                {`${reservation?.field.city.name}, ${reservation?.field.name}`}
              </dt>
              <dd className="mt-1 text-base font-semibold leading-6 text-blue-900">
                {reservation?.openEntry ? "Free entry" : "All random"}
              </dd>
              <dd className="mt-1 text-base font-semibold leading-6 text-gray-600">
                {"Id: " + reservation?.num}
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
                  {toLocaleDate(reservation?.time)}
                </time>
              </dd>
            </div>

            {(reservation?.openEntry || reservation?.status === "done") && (
              <div className="mt-4 flex center w-full flex-none gap-x-4 px-6">
                <PlayersList
                  players={reservation?.match?.blackTeam?.players}
                  title={"Black Team"}
                  removePlayer={removePlayer}
                  addPlayer={addPlayer}
                  action={"blackTeam"}
                  registered={reservation?.match?.blackTeam?.players.length}
                  capacity={reservation?.field.maxPlayers / 2}
                  closeModal={closeModal}
                  status={reservation?.status}
                />
                <PlayersList
                  players={reservation?.match?.whiteTeam?.players}
                  title={"White Team"}
                  removePlayer={removePlayer}
                  addPlayer={addPlayer}
                  action={"whiteTeam"}
                  registered={reservation?.match?.whiteTeam?.players.length}
                  capacity={reservation?.field.maxPlayers / 2}
                  closeModal={closeModal}
                  status={reservation?.status}
                />
              </div>
            )}
            {!reservation?.openEntry && reservation?.status !== "done" && (
              <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                <PlayersList
                  players={reservation?.registeredPlayers}
                  title={"Registered players"}
                  removePlayer={removePlayer}
                  addPlayer={addPlayer}
                  action={"registeredPlayers"}
                  registered={reservation?.registeredPlayers.length}
                  capacity={reservation?.field.maxPlayers}
                  closeModal={closeModal}
                  status={reservation?.status}
                />
              </div>
            )}

            {reservation?.status === "done" && (
              <div className="full-center mt-5 flex-column">
                <h1 className="text-xl text-gray-700 p-2 antialiased">Score</h1>
                <div className="flex text-center">
                  <input
                    className="w-3"
                    onChange={(e) => {
                      setBlackTeamScore(+e.target.value);
                      setSaveResult(true);
                    }}
                    value={blackTeamScore}
                  />
                  <div className="w-10 text-center">:</div>
                  <input
                    className="w-3 text-center"
                    onChange={(e) => {
                      setWhiteTeamScore(+e.target.value);
                      setSaveResult(true);
                    }}
                    value={whiteTeamScore}
                  />
                </div>
                {saveResult && (
                  <button
                    onClick={handleSaveResult}
                    className="bg-blue-500 hover:bg-blue-700 mt-3 text-white font-bold py-1 px-4 rounded-full transition duration-300 ease-in-out transform  "
                  >
                    Save{" "}
                  </button>
                )}
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
      )}
    </div>
  );
}
