package com.example.Project_team_5.Service;

import com.example.Project_team_5.Model.Payment_T5;

import java.util.List;
import java.util.Map;

public interface Payment_T5ServiceInterface {
    List<Payment_T5> getAllPayments();
    Payment_T5 getPaymentById(Long id);
    Payment_T5 createPayment(Payment_T5 payment);
    Payment_T5 updatePaymentPartially(Long id, Map<String, Object> updates);
    void deletePayment(Long id);
}

