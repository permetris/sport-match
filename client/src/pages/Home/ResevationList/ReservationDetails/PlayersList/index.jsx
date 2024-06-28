import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import { ROLES } from "../../../../../utils/roles";
import SearchBox from "../../../../../components/SearchBox";
import { useLazyGetUsersQuery } from "../../../../../slices/apiSlice";
import { useNavigate } from "react-router-dom";

export function PlayersList({
  players,
  title,
  removePlayer,
  addPlayer,
  action,
  capacity,
  registered,
  closeModal,
  status,
}) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [getUsers, { data: users }] = useLazyGetUsersQuery();
  const [selectedUser, setSelectedUser] = useState(users?.data[0]);
  const isJoined =
    players?.filter((each) => each.username === user?.username).length > 0;

  const handleAdminPlayerAdd = () => {
    addPlayer(selectedUser, action);
    setSelectedUser(null);
  };
  useEffect(() => {
    if (user && user.role !== ROLES.USER) getUsers({ username: query });
  }, [query]);

  return (
    <div className="w-full text-center">
      <div>
        <ul className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
          <h2 className="text-gray-700 p-2 antialiased">
            {`${title.toUpperCase()} ${registered}/${capacity}`}
          </h2>
          {players?.map((player) => (
            <li
              className="p-1 hover:bg-gray-100 transition-colors duration-200 space-x-12"
              key={player._id}
            >
              <span
                className="cursor-pointer z-50"
                onClick={() => {
                  closeModal();
                  navigate(`/user/${player.username}/history`);
                }}
              >
                {player.username}{" "}
              </span>
              {user?.role !== "USER" && status !== "done" && (
                <button
                  className="text-red-800 hover:text-red-300"
                  onClick={() => removePlayer(player, action)}
                >
                  {" "}
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      {user &&
        user.role === ROLES.USER &&
        players?.lenght !== capacity &&
        !isJoined &&
        status !== "done" && (
          <button
            className="bg-blue-500 hover:bg-blue-700 mt-3 text-white font-bold py-1 px-4 rounded-full transition duration-300 ease-in-out transform  "
            onClick={() => addPlayer(user, action)}
          >
            Join
          </button>
        )}

      {isJoined && status !== "done" && (
        <button
          className="bg-red-500 hover:bg-red-700 mt-3 text-white font-bold py-1 px-4 rounded-full transition duration-300 ease-in-out transform  "
          onClick={() => removePlayer(user, action)}
        >
          Withdraw
        </button>
      )}

      {user && user?.role === ROLES.ADMIN && registered !== capacity && (
        <SearchBox
          data={users?.data}
          selectedItem={selectedUser}
          setSelectedItem={setSelectedUser}
          setQuery={setQuery}
          displayKey={"username"}
          title={""}
        />
      )}

      {selectedUser &&
        user &&
        user.role !== ROLES.USER &&
        players?.lenght !== capacity && (
          <button
            className="bg-blue-500 hover:bg-blue-700 mt-3 text-white font-bold py-1 px-4 rounded-full transition duration-300 ease-in-out transform  "
            onClick={() => handleAdminPlayerAdd()}
          >
            Add player
          </button>
        )}
    </div>
  );
}
