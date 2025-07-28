package com.EMS.EmployeeManagementSystem.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.EMS.EmployeeManagementSystem.Entity.Employee;
import com.EMS.EmployeeManagementSystem.Repository.EmployeeRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class EmployeeService {
	
	@Autowired
	private EmployeeRepository employeeRepository;

	public Employee postEmployee(Employee employee) {
		
		return employeeRepository.save(employee);
	}

	public List<Employee> getAllEmployees() {
		// TODO Auto-generated method stub
		return employeeRepository.findAll();
	}

	public void deleteEmpById(Long id) throws Exception {
		// TODO Auto-generated method stub
		if(!employeeRepository.existsById(id)) {
		     
			throw new EntityNotFoundException("Entity does Not Exist with Id :" + id);
		}
		
		employeeRepository.deleteById(id);
	}

	public ResponseEntity<Employee> updateById(Long id, Employee updatedEmployee) {
	    Optional<Employee> optionalEmployee = employeeRepository.findById(id);

	    if (optionalEmployee.isPresent()) {
	        Employee existingEmployee = optionalEmployee.get();
	        
	        // Update the fields with data from updatedEmployee
	        existingEmployee.setName(updatedEmployee.getName());
	        existingEmployee.setEmail(updatedEmployee.getEmail());
	        existingEmployee.setDepartment(updatedEmployee.getDepartment());
	        // Add any other relevant fields here

	        employeeRepository.save(existingEmployee);
	        return ResponseEntity.ok(existingEmployee);
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}

	public ResponseEntity<Employee> getEmployeeBy(Long id) {
        Optional<Employee> employee = employeeRepository.findById(id);

        return employee
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


}
