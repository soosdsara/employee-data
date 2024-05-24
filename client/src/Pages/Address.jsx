import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

async function fetchEmployee(id) {
  const response = await fetch(`/api/employees/${id}`);
  const employee = await response.json();
  return employee;
}

async function updateAddress(id, employee) {
  const response = await fetch(`/api/employees/${id}`, {
    method: 'PATCH',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee)
  })
  const updatedEmployee = await response.json();
  return updatedEmployee;
}

function Address() {
  const [employee, setEmployee] = useState(null);
  const [editForm, setEditForm] = useState(false);
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [street, setStreet] = useState();
  const [zipCode, setZipCode] = useState();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    async function fetch() {
      const employee = await fetchEmployee(id)
      setEmployee(employee)
      setCountry(employee.address?.country);
      setCity(employee.address?.city);
      setStreet(employee.address?.street);
      setZipCode(employee.address?.zipCode);
    }
    fetch()
  }, [id])

  async function handleSubmit(e) {
    e.preventDefault();
    const newAdress = { country, city, street, zipCode };
    const updatedEmployee = { ...employee, address: newAdress }
    await updateAddress(id, updatedEmployee)
    setEditForm(false);
    navigate("/")
  }

  if (!employee) {
    return (<div>Loading...</div>)
  }

  return (
    <>
      {editForm && (
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>Country:
            <input type='text' value={country} onChange={(e) => setCountry(e.target.value)}></input>
          </label>
          <label>City:
            <input type='text' value={city} onChange={(e) => setCity(e.target.value)}></input>
          </label>
          <label>Street:
            <input type='text' value={street} onChange={(e) => setStreet(e.target.value)}></input>
          </label>
          <label>Zip code:
            <input type='number' value={zipCode} onChange={(e) => setZipCode(e.target.value)}></input>
          </label>
          <button type='submit'> Update address</button>
        </form >
      )
      }
      <div>
        {employee.name}:
        <div>{employee.address?.country}</div>
        <div>{employee.address?.city}</div>
        <div>{employee.address?.street}</div>
        <div>{employee.address?.zipCode}</div>
      </div>
      <button onClick={() => setEditForm(true)}>Edit</button>
    </>
  )
}

export default Address