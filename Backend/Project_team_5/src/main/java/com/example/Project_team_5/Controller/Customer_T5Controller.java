package com.example.Project_team_5.Controller;

import com.example.Project_team_5.Model.Customer_T5;
import com.example.Project_team_5.Service.Customer_T5ServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:5173/")
public class Customer_T5Controller {

    @Autowired
    private Customer_T5ServiceInterface customerService;

    @GetMapping
    public List<Customer_T5> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer_T5> getCustomerById(@PathVariable Long id) {
        Customer_T5 customer = customerService.getCustomerById(id);
        return ResponseEntity.ok(customer);
    }

    @PostMapping
    public Customer_T5 createCustomer(@RequestBody Customer_T5 customer) {
        return customerService.createCustomer(customer);
    }
    @PatchMapping("/{id}")
    public Customer_T5 updateCustomerPartially(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        return customerService.updateCustomerPartially(id, updates);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody Map<String, String> loginRequest){
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");
        Customer_T5 customer = customerService.login(email,password);
        if(customer != null)
            return ResponseEntity.status(200).body(customer);
        else
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
        return ResponseEntity.noContent().build();
    }
}

