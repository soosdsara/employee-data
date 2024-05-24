import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm";
import Loading from "../Components/Loading";

const updateEmployee = async (employee, brand, equipment) => {
  const res = await fetch(`/api/employees/${employee._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...employee, favoriteBrand: brand, equipment: equipment }),
  });
  return await res.json();
};

const fetchEmployee = async (id) => {
  const res = await fetch(`/api/employees/${id}`);
  return await res.json();
};

async function fetchBrands() {
  const response = await fetch(`/api/brand`);
  const brands = await response.json();
  return brands
}

const EmployeeUpdater = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [employeeLoading, setEmployeeLoading] = useState(true);
  const [equipments, setEquipments] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    fetchBrands()
      .then((brands) => {
        setBrands(brands)
      })
    setEmployeeLoading(true);
    fetchEquipments()
    fetchEmployee(id)
      .then((employee) => {
        setEmployee(employee);
        setSelectedBrand(employee.favoriteBrand._id);
        setSelectedEquipment(employee.equipment)
        setEmployeeLoading(false);
      });
  }, [id]);


  const handleUpdateEmployee = (employee) => {
    setUpdateLoading(true);
    updateEmployee(employee, selectedBrand, selectedEquipment)
      .then(() => {
        setUpdateLoading(false);
        navigate("/");
      });
  };

  if (employeeLoading) {
    return <Loading />;
  }

  async function fetchEquipments() {
    const response = await fetch('/api/equipments/');
    const equipments = await response.json();
    setEquipments(equipments)
  }
  console.log(employee);

  return (
    <>
      <EmployeeForm
        employee={employee}
        onSave={handleUpdateEmployee}
        disabled={updateLoading}
        onCancel={() => navigate("/")}
      />
      <select onChange={(e) => setSelectedEquipment(e.target.value)} value={selectedEquipment}>
        <option value={null}>No equipment</option>
        {equipments.map(equipment => (
          <option value={equipment.name}>{equipment.name}</option>
        ))}
      </select>
      <select onChange={(e) => setSelectedBrand(e.target.value)} value={selectedBrand}>
        {brands.map(brand => (
          <option value={brand._id}>{brand.name}</option>
        ))}
      </select>
    </>
  );
};

export default EmployeeUpdater;
