import React from "react";
import { useAuth } from "../../../../../context/AuthContext";

export function PlayersList({ players,title,removePlayer,addPlayer }) {
    const {user} = useAuth();

  return (
    <div className="w-full text-center">
     {title}
      <div >
        <ul>
          {players?.map((player) => (
            <li className="text-center" key={player._id}>{player.username} {user.role === "ADMIN" && <button className="text-red" onClick={()=> removePlayer(player._id)}> Remove</button>}</li>
          ))}
        </ul>
      </div>
      <button onClick={() => addPlayer()}>Join</button>
    </div>
  );
}
