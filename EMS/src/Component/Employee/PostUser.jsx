import React, { useState } from "react";
import "./PostUser.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PostUser = () => {
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

  const navigate  = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
   
    console.log(formData);
    try {
      
      const response  = await fetch("http://localhost:8080/api/addEmp",{

        method:"POST",
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify(formData)
      });

      const data  =  await response.json();
      console.log(data);
      navigate("/");

    } catch (error) {
      
      console.log("Error posting amployee data:" , error.message);
      alert("Failed to post Employee data. Please try again later.");

    }

  };

  return (
    <div className="post-user-container">
      <h2 className="text-center mb-4" style={{ fontWeight: 700, color: "#182848" }}>
        Post New Employee
      </h2>
      <Form className="post-user-form" onSubmit={handleSubmit}>
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
          Post Employee
        </Button>
      </Form>
    </div>
  );
};

export default PostUser;
