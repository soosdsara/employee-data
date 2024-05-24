import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = async (page) => {
  const response = await fetch(`/api/employees?page=${page}`);
  return await response.json();
};

const deleteEmployee = async (id) => {
  const res = await fetch(`/api/employees/${id}`, { method: "DELETE" });
  return await res.json();
};

async function updateAttendance(id) {
  const response = await fetch(`/api/employees-attendance/${id}`, { method: 'PATCH' });
  return await response.json();
}

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(true);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null)

  const handleDelete = (id) => {
    setDeleteConfirmation(id)
  };

  async function confirmDelete() {
    await deleteEmployee(deleteConfirmation);
    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== deleteConfirmation);
    });
    setDeleteConfirmation(null);
  }

  function cancelDelete() {
    setDeleteConfirmation(null);
  }

  async function handleAttendance(id) {
    await updateAttendance(id);
    const updatedEmployees = await fetchEmployees(currentPage);
    setEmployees(updatedEmployees);
    /*      const newEmployees = employees.map(employee => {
          if (employee._id === id) {
            return { ...employee, attendance: !employee.attendance };
          }
          return employee;
        });
        setEmployees(newEmployees); */
  }

  function handleNameClick() {
    const sortedEmployees = [...employees];
    sortedEmployees.sort((a, b) => (
      direction === false ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    ))
    setEmployees(sortedEmployees);
    setDirection(!direction);
  }

  useEffect(() => {
    fetchEmployees(currentPage)
      .then((employees) => {
        setLoading(false);
        setEmployees(employees);
      })
  }, [currentPage]);

  if (loading) {
    return <Loading />;
  }

  return (
  <>
    {deleteConfirmation && (
      <div className="confirmation-modal">
        <p>Are you sure you want to delete this employee?</p>
        <button onClick={() => confirmDelete()}>Yes</button>
        <button onClick={() => cancelDelete()}>No</button>
      </div>
    )}
    <EmployeeTable employees={employees} onDelete={handleDelete} onAttendance={handleAttendance} onNameClick={handleNameClick} />
    <div className="pagination">
      <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      <span>{currentPage}</span>
      <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === 10}> Next </button>
    </div>
  </>);
};

export default EmployeeList;
