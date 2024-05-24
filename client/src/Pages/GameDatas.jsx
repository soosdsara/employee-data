import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";


function GameDatas() {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  async function fetchGame(id) {
    const response = await fetch(`/api/boardgame/${id}`);
    const game = await response.json();
    setGame(game)
  }

  useEffect(() => {
    fetchGame(id)
  }, [id])

  if (!game) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div>
      <ul>
        <li> Name: {game.name}_____Max players: {game.maxPlayers}_____id: {game._id}</li>
      </ul>
    </div>
  )
}

export default GameDatas