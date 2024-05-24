import React, { useState } from 'react'

async function addBoardgame(game) {
  const response = await fetch('/api/boardgame', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(game)
  });
  const newGame = response.json();
  return newGame;
}

function Boardgame() {
  const [name, setName] = useState(null);
  const [maxPlayers, setmaxPlayers] = useState(0);

  async function handleSubmit(e) {
    e.preventDefault();
    const boardgame = {
      name,
      maxPlayers
    }
    await addBoardgame(boardgame);
  }

  return (
    <div>
      <form className='boardgameCreator' onSubmit={(e) => handleSubmit(e)}>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)}></input>
        <input type='number' value={maxPlayers} onChange={(e) => setmaxPlayers(e.target.value)}></input>
        <button type='submit'>Add a new game</button>
      </form>
    </div>
  )
}

export default Boardgame