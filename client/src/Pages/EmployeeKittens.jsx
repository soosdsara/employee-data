import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loading from '../Components/Loading';

function EmployeeKittens() {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [kittenName, setKittenName] = useState(null);
  const [kittenweight, setKittenWeight] = useState(0);

  async function deleteKitten(kitten, kittens) {
    const response = await fetch(`/api/kittens?kitten=${kitten._id}&employee=${employeeId}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...employee, kittens: kittens }),
    });
    const updatedEmployee = await response.json();
    fetchEmployee(employeeId);
    return updatedEmployee;
  }

  async function createAndAddKitten(kitten) {
    const response = await fetch(`/api/kittens`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(kitten),
      });
    const updatedEmployee = await response.json();
    fetchEmployee(employeeId);
    return updatedEmployee;
  }

  async function fetchEmployee(id) {
    const response = await fetch(`/api/employees/${id}`);
    const employee = await response.json();
    setEmployee(employee);
  }

  async function addKitten(e) {
    e.preventDefault();
    const kitten = {
      name: kittenName,
      weight: kittenweight,
      employee: employeeId
    };
    await createAndAddKitten(kitten);
    setKittenName(null);
    setKittenWeight(0);
  }

  useEffect(() => {
    fetchEmployee(employeeId)
  }, [employeeId])

  if (!employee) {
    return <Loading />;
  }

  const kittens = employee.kittens;

  async function handleDelete(kitten) {
    const updatedKittens = kittens.filter(k => {
      return k.name !== kitten.name
    });
    return deleteKitten(kitten, updatedKittens)
  }

  return (
    <div>
      <ul>
        {kittens.map(kitten => (
          <>
            <li>{kitten.name}____{kitten.weight}kg</li>
            <button type='button' onClick={() => handleDelete(kitten)}>Delete</button>
          </>
        ))}
      </ul>
      <form onSubmit={(e) => addKitten(e)}>
        <label>
          Kitten name:
          <input type='text' name='kittenName' value={kittenName} onChange={(e) => setKittenName(e.target.value)} />
        </label>
        <label>
          Kitten weight:
          <input value={kittenweight} type='number' step='0.1' onChange={(e) => setKittenWeight(e.target.value)} />
        </label>
        <button type='submit'>Add a kitten</button>
      </form>
    </div>
  )
}

export default EmployeeKittens;