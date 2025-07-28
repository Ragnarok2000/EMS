import React, { useEffect, useState } from "react";
import "./UpdatedEmp.css";
import { Button ,Form} from "react-bootstrap";
import {  useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

const UpdateEmp = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
  event.preventDefault(); // prevent page reload on submit

  try {
    const response = await fetch(`http://localhost:8080/api/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Employee updated successfully!");
      // Optionally redirect or reset form
    } else {
      const errorData = await response.json();
      console.error("Update failed:", errorData);
      alert("Failed to update employee. Please check the input.");
    }
  } catch (error) {
    console.error("Network error:", error.message);
    alert("Something went wrong while updating. Try again later.");
  }
};


  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/getEmpById/${id}`);
        const data = await response.json();
        setFormData(data);
        console.log(data);
      } catch (error) {
        console.error("Error detching user", error.message);
      }
    };

    fetchEmployee();
  }, [id]);

  return (
    <>
    <div className="post-user-container">
      <h2
        className="text-center mb-4"
        style={{ fontWeight: 700, color: "#182848" }}
      >
        Update Employee
      </h2>
      <Form className="post-user-form" onSubmit={handleSubmit} >
        <Row>
          <Col xs={12} className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              required
            />
          </Col>
          <Col xs={12} className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              required
            />
          </Col>
          <Col xs={12} className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="tel"
              placeholder="Enter Phone"
              autoComplete="off"
              required
            />
          </Col>
          <Col xs={12} className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="mt-2 w-100">
          Edit Employee
        </Button>
      </Form>
    </div>
    </>
  );
};

export default UpdateEmp;
