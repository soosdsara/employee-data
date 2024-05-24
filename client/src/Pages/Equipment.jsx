import { useEffect, useState } from 'react'
import EquipmentUpdateForm from "../Components/EquipmentUpdateForm";


async function deleteEquipment(id) {
  const response = await fetch(`/api/equipments/${id}`, { method: 'DELETE' });
  return await response.json();
}

function Equipment() {
  const [equipments, setEquipments] = useState([]);
  const [updateEquipmentId, setUpdateEquipmentId] = useState('');


  useEffect(() => {
    async function fetchEquipments() {
      const response = await fetch('/api/equipments/');
      const equipments = await response.json();
      setEquipments(equipments);
    }
    fetchEquipments()
  }, [])

  function handleDelete(id) {
    deleteEquipment(id)

    const newList = equipments.filter(e => {
      return e._id !== id
    });
    setEquipments(newList);
  }

  async function handleUpdate(id, data) {
    const filteredData = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== '' && value !== null) {
        filteredData[key] = value;
      }
    }
    const response = await fetch(`/api/equipments/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filteredData),
    });
    setUpdateEquipmentId('')
    return await response.json();
  }

  return (
    <ul>
      {equipments.map((equipment, index) => (
        <li key={index} > {equipment._id}, name: {equipment.name}, type: {equipment.type}, amount: {equipment.amount}
          <button onClick={() => handleDelete(equipment._id)} >Delete</button>
          <button onClick={() => setUpdateEquipmentId(equipment._id)}>Update</button>
          {updateEquipmentId === equipment._id ? (
            <EquipmentUpdateForm formData={(data) => handleUpdate(equipment._id, data)} />
          ) : null}
        </li>
      ))}
    </ul>
  )
}

export default Equipment