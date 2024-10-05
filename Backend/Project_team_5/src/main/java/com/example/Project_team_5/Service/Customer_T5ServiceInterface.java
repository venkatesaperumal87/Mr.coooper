package com.example.Project_team_5.Service;

import com.example.Project_team_5.Model.Customer_T5;
import java.util.List;
import java.util.Map;

public interface Customer_T5ServiceInterface {
    List<Customer_T5> getAllCustomers();
    Customer_T5 getCustomerById(Long id);
    Customer_T5 createCustomer(Customer_T5 customer);
    Customer_T5 updateCustomerPartially(Long id, Map<String, Object> updates);
    void deleteCustomer(Long id);
    Customer_T5 login(String email, String password);
}
