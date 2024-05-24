import { Link } from "react-router-dom";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, onDelete, onAttendance, onNameClick }) => {

  function formDate(employee) {
    const date = String(employee.startingDate).substr(0, 10).replaceAll('-', '.');
    return date + '.';
  }

  function formSalary(salary) {
    const formattedSalary = salary.toLocaleString();
    return '$' + formattedSalary
  }

  function calculateDifference({desiredSalary, currentSalary}) {
    return Math.round(((desiredSalary - currentSalary) / currentSalary) * 100) + '%'
  }
  

  return (
  <div className="EmployeeTable">
    <table>
      <thead>
        <tr>
          <th onClick={() => onNameClick()}>Name</th>
          <th>Level</th>
          <th>Position</th>
          <th />
          <th>Favorite brand</th>
          <th>Starting date</th>
          <th>Current salary</th>
          <th>Desired salary</th>
          <th>Difference</th>
          <th>Max player</th>
          <th>City</th>
          <th>Color</th>
          <th>Attendance</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td>{employee.name}</td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
            <td>
              <Link to={`/update/${employee._id}`}>
                <button type="button">Update</button>
              </Link>
              <button type="button" onClick={() => onDelete(employee._id)}>
                Delete
              </button>
            </td>
            <td>{employee.favoriteBrand?.name}</td>
            <td>{formDate(employee)}</td>
            <td>{formSalary(employee.currentSalary)}</td>
            <td>{formSalary(employee.desiredSalary)}</td>
            <td>{calculateDifference(employee)}</td>
            <td>{employee.boardGame?.maxPlayers}</td>
            <td>{employee.address?.city}</td>
            <td style={{ background: employee.favoriteColor, border: '2px solid' }}></td>
            <td>
                <input
                  type="checkbox"
                  checked={employee.attendance}
                  onChange={() => onAttendance(employee._id)} />
            </td>
            <Link to={`/kittens/${employee._id}`}>
                <button type="button">Kittens</button>
              </Link>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)};

export default EmployeeTable;