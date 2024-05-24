import React, { useEffect, useState } from 'react'

const Sort = () => {
  const [employees, setEmployees] = useState([]);
  const [direction, setDirection] = useState(false);

  const fetchEmployees = async () => {
    const res = await fetch("/api/employees/all");
    const data = await res.json();
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, [])

  async function fetchSortedEmployees(sortby) {
    const response = await fetch(`/api/employees-sort?sortby=${sortby}&direction=${direction}`);
    const sortedEmployees = await response.json();
    setEmployees(sortedEmployees);
  }

   function handleSort(sortby) {
    setDirection(!direction)
    fetchSortedEmployees(sortby)
  }

  return (
    <div>
      <button onClick={() => handleSort('first')}>First name</button>
      <button onClick={() => handleSort('middle')}>Middle name</button>
      <button onClick={() => handleSort('last')}>Last name</button>
      <button onClick={() => handleSort('position')}>Position</button>
      <button onClick={() => handleSort('level')}>Level</button>
      <ul>
        {employees.map((e, index) => (
          <li key={index}> Name: {e.name}, Level: {e.level}, Position: {e.position} </li>
        ))}
      </ul>
    </div>
  )
}

export default Sort