import { useEffect, useState } from "react";
import EmployeeTable from "../Components/EmployeeTable";
import SearchInput from "../Components/SearchInput";

const fetchEmployees = () => {
  return fetch("/api/employees/all").then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    fetchEmployees()
      .then((employees) => {
        //setLoading(false);
        setEmployees(employees);
      })
  }, []);

  return (<>
    <SearchInput onSearch={(filter)=>setEmployees(filter)}/>
    
    <EmployeeTable employees={employees} onDelete={handleDelete} />
  </>);
};

export default EmployeeList;
