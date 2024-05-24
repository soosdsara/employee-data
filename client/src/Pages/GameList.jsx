import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

async function fetchGames(maxPlayers) {
  const url = maxPlayers ? `/api/boardgame?maxPlayers=${maxPlayers}` : '/api/boardgame';
  const response = await fetch(url);
  const games = await response.json();
  return games;
}

function GameList() {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();
  
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const maxPlayersQueryParam = params.get('maxPlayers');


  useEffect(() => {
    async function fetchData() {
      const gamesList = await fetchGames(maxPlayersQueryParam);
      setGames(gamesList);
    }
    fetchData();
  }, [maxPlayersQueryParam]);

  return (
    <div className="GameTable">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Max players</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game._id}>
              <td>{game.name}</td>
              <td>{game.maxPlayers}</td>
              <td>
                <button onClick={() => navigate(`/games-list/${game._id}`)}>More details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GameList;
