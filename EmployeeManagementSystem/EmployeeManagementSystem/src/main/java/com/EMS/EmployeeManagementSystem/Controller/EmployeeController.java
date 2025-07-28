package com.EMS.EmployeeManagementSystem.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.EMS.EmployeeManagementSystem.Entity.Employee;
import com.EMS.EmployeeManagementSystem.Service.EmployeeService;

import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class EmployeeController {
	
	@Autowired
	private EmployeeService employeeService;
	
	
	@PostMapping("/addEmp")
	public Employee addEmployee(@RequestBody Employee employee) {
		
		return employeeService.postEmployee(employee);
	}
	
	@GetMapping("/getEmp")
	public List<Employee> getAllEmployee(){
		
		return employeeService.getAllEmployees();
	}
	
	
	@DeleteMapping("/removeEmpById/{id}")
	public void deleteEmploye(@PathVariable Long id) throws Exception {
		
		 employeeService.deleteEmpById(id);
		 
		
	}
	
	@GetMapping("/getEmpById/{id}")
	public ResponseEntity<Employee> getEmployeeByid(@PathVariable Long id) {
        return employeeService.getEmployeeBy(id);
    }

	
	
	
	@PutMapping("/update/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable Long id ,@RequestBody Employee updatedEmployee){
		
		return employeeService.updateById(id, updatedEmployee);
	}
	

}
