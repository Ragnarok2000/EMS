import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [employee, setEmployee] = useState([]);

  const navigate = useNavigate();


  const updatedEmpHandle = (employeeId) =>{

    navigate(`/employee/${employeeId}`);
  }

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/getEmp");
        const data = await response.json();

        setEmployee(data);
      } catch (error) {
        console.log("Error fetchinhg employee", error.message);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (employeeId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/removeEmpById/${employeeId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setEmployee((prevEmployee) =>
          prevEmployee.filter((employee) => employee.id !== employeeId)
        );
      }

      console.log(`Employee with Id ${employeeId} has been deletd sucessfully`);
    } catch (error) {
      console.log("Error Deleteing employee", error.message);
    }
  };

  return (
    <div>
      <Container className="mt-5 dashboard-container ">
        <Row>
          <Col className="text-center mb-5 fs-2 dashboard-title">Employees</Col>
        </Row>

        <Table responsive="xl">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>{employee.department}</td>
                <td>
                  
                  <Button
                    variant="outline-primary"
                    className="mx-3 dashboard-action-btn update"
                    onClick={ ()=> updatedEmpHandle(employee.id)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outline-danger"
                    className="dashboard-action-btn delete"
                    onClick={() => handleDelete(employee.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Dashboard;
