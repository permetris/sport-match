import React, { useState } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import { ROLES } from "../../../../../utils/roles";
import SearchBox from "../../../../../components/SearchBox";
import { useGetUsersQuery } from "../../../../../slices/apiSlice";

export function PlayersList({
  players,
  title,
  removePlayer,
  addPlayer,
  action,
  capacity,
}) {
  const { user } = useAuth();

  const [query, setQuery] = useState();
  const { data: users } = useGetUsersQuery({ username: query });
  const [selectedUser, setSelectedUser] = useState(users?.data[0]);
  const isJoined = players?.filter((each) => each.username === user.username).length > 0 ;


  const handleAdminPlayerAdd = () => {
    addPlayer(selectedUser, action);
    setSelectedUser(null);
  };

  return (
    <div className="w-full text-center">
      <div>
        <ul className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
          <h2 className="text-gray-700 p-2 antialiased">
            {title.toUpperCase()}
          </h2>
          {players?.map((player) => (
            <li
              className="p-1 hover:bg-gray-100 transition-colors duration-200 space-x-12"
              key={player._id}
            >
              <span>{player.username} </span>
              {user?.role === "ADMIN" && (
                <button
                  className="text-red-800 hover:text-red-300"
                  onClick={() => removePlayer(player._id)}
                >
                  {" "}
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      {user && user.role === ROLES.USER && players?.lenght !== capacity && !isJoined && (
        <button
          className="bg-blue-500 hover:bg-blue-700 mt-3 text-white font-bold py-1 px-4 rounded-full transition duration-300 ease-in-out transform  "
          onClick={() => addPlayer(user, addPlayerTo)}
        >
          Join
        </button>
      )}

      {isJoined && (
        <button
          className="bg-red-500 hover:bg-red-700 mt-3 text-white font-bold py-1 px-4 rounded-full transition duration-300 ease-in-out transform  "
          onClick={() => removePlayer(user, addPlayerTo)}
        >
          Withdraw
        </button>
      )}

      {user && user?.role === ROLES.ADMIN && (
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
