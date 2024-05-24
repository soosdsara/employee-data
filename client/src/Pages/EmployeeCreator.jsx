import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm";

const createEmployee = (employee, brand) => {
  return fetch("/api/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...employee, favoriteBrand: brand, equipment: null }),
  }).then((res) => res.json());
};

async function fetchBrands() {
  const response = await fetch(`/api/brand`);
  const brands = await response.json();
  return brands
}

const EmployeeCreator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const brands = await fetchBrands();
      setBrands(brands)
    }
    fetchData()
  }, [])


  const handleCreateEmployee = (employee) => {
    setLoading(true);

    createEmployee(employee, selectedBrand)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
  };

  return (
    <>
      <EmployeeForm
        onCancel={() => navigate("/")}
        disabled={loading}
        onSave={handleCreateEmployee}
      />
      <select onChange={(e) => setSelectedBrand(e.target.value)}>
        <option value={null}>Favorite brand</option>
        {brands.map(brand => (
          <option value={brand._id}>{brand.name}</option>
        ))}
      </select>
    </>
  );
};

export default EmployeeCreator;
