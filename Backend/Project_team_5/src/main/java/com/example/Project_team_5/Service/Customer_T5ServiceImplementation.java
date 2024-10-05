package com.example.Project_team_5.Service;

import com.example.Project_team_5.Model.Customer_T5;
import com.example.Project_team_5.Repository.Customer_T5Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class Customer_T5ServiceImplementation implements Customer_T5ServiceInterface {

    @Autowired
    private Customer_T5Repository customerT5Repository;

    public Customer_T5ServiceImplementation(Customer_T5Repository customerT5Repository) {
        this.customerT5Repository = customerT5Repository;
    }

    @Override
    public List<Customer_T5> getAllCustomers() {
        List<Customer_T5> customers = new ArrayList<>();
        customerT5Repository.findAll().forEach(customers::add);
        return customers;
    }

    @Override
    public Customer_T5 login(String email, String password) {
        List<Customer_T5> customers = customerT5Repository.findAll();
        for (Customer_T5 customer : customers) {
            if (customer.getEmail().equals(email) && customer.getPassword().equals(password)) {
                return customer;
            }
        }
        return null;
    }

    @Override
    public Customer_T5 getCustomerById(Long id) {
        return customerT5Repository.findById(id).orElse(null);
    }

    @Override
    public Customer_T5 createCustomer(Customer_T5 customer) {
        return customerT5Repository.save(customer);
    }

    @Override
    public Customer_T5 updateCustomerPartially(Long id, Map<String, Object> updates) {
        Optional<Customer_T5> optionalCustomer = customerT5Repository.findById(id);
        if (optionalCustomer.isPresent()) {
            Customer_T5 customer = optionalCustomer.get();
            updates.forEach((key, value) -> {
                switch (key) {
                    case "e_mail":
                        customer.setEmail((String) value);
                        break;
                    case "password":
                        customer.setPassword((String) value);
                        break;
                    case "customer_name":
                        customer.setCustomerName((String) value);
                        break;
                    case "phone":
                        customer.setPhone((String) value);
                        break;
                }
            });
            return customerT5Repository.save(customer);
        }
        return null;
    }

    @Override
    public void deleteCustomer(Long id) {
        customerT5Repository.deleteById(id);
    }
}

