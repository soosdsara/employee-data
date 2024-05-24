import React, { useEffect, useState } from 'react'

function Missing() {

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function ferchMissingEmployees() {
      const response = await fetch("/api/employees-filter?filter=false");
      const missingEmployees = await response.json();
      setEmployees(missingEmployees)
    }
    ferchMissingEmployees()
  }, [])
  

  return (
    <ul>
      {employees.map((employee, index) => {
        return <li key={index} > {employee.name}</li>
      })}
    </ul>
  )
}

export default Missing