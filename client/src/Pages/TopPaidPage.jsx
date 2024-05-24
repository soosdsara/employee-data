import React, { useEffect, useState } from 'react'


async function fetchEmployees() {
  const response = await fetch(`/api/employees-topsalary`);
  const employees = await response.json();
  return employees;
}


function TopPaidPage() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function fetch() {
      const employees = await fetchEmployees()
      setEmployees(employees)
    }
    fetch();
  }, [])


  return (
    <div>
      <ul>
        {employees.map(employee => (
          <li>{employee.name}___________${employee.currentSalary}</li>
        ))}
      </ul>
    </div>
  )
}

export default TopPaidPage