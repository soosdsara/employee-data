import { useState, useEffect } from "react";

async function fetchBoardGames() {
  const response = await fetch(`/api/boardgame`);
  const boardGames = await response.json();
  return boardGames;
}

const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const [name, setName] = useState(employee?.name ?? "");
  const [level, setLevel] = useState(employee?.level ?? "");
  const [position, setPosition] = useState(employee?.position ?? "");
  const [salary, setSalary] = useState(employee?.currentSalary ?? 0);
  const [desire, setDesire] = useState(employee?.desiredSalary ?? 0);
  const [date, setDate] = useState(employee?.startingDate ?? null);
  const [color, setColor] = useState(employee?.favoriteColor ?? null);
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(employee?.boardGame ?? null);


  useEffect(() => {
    async function Fetch() {
      const games = await fetchBoardGames();
      setGames(games)
    }
    Fetch();
  }, [])

  console.log(games);

  const onSubmit = (e) => {
    e.preventDefault();

    if (employee) {
      return onSave({
        ...employee,
        name,
        level,
        position,
        currentSalary: salary,
        desiredSalary: desire,
        startingDate: date,
        favoriteColor: color,
        boardGame: selectedGame
      });
    }

    return onSave({
      name,
      level,
      position,
      currentSalary: salary,
      desiredSalary: desire,
      startingDate: date,
      favoriteColor: color,
      boardGame: selectedGame
    });
  };

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          name="level"
          id="level"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          name="position"
          id="position"
        />
      </div>

      <div className="control">
        <label>Salary:
          <input
            type='number'
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            name="salary"
            id="salary"
          />
        </label>
      </div>

      <div className="control">
        <label>Desired salary:
          <input
            type='number'
            value={desire}
            onChange={(e) => setDesire(e.target.value)}
            name="desire"
            id="desire"
          />
        </label>
      </div>

      <div className="control">
        <label>Starting date:
          <input
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            name="date"
            id="date"
          />
        </label>
      </div>
      <div className="control">
        <label>Favorite color:
          <input
            type='color'
            value={color}
            onChange={(e) => setColor(e.target.value)}
            name="color"
            id="color"
          />
        </label>
      </div>
      <div className="control">
        <label>Favorite board game:
          <select value={selectedGame} onChange={(e) => setSelectedGame(e.target.value)}>
            <option value={null} > No board game</option>
            {games.map(game => (
              <option value={game._id}> {game.name} </option>
            ))}
          </select>
        </label>
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
