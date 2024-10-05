package com.example.Project_team_5.Service;

import com.example.Project_team_5.Model.Payment_T5;
import com.example.Project_team_5.Repository.Payment_T5Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class Payment_T5ServiceImplementation implements Payment_T5ServiceInterface {

    @Autowired
    private Payment_T5Repository paymentT5Repository;

    @Override
    public List<Payment_T5> getAllPayments() {
        List<Payment_T5> payments = new ArrayList<>();
        paymentT5Repository.findAll().forEach(payments::add);
        return payments;
    }

    @Override
    public Payment_T5 getPaymentById(Long id) {
        return paymentT5Repository.findById(id).orElse(null);
    }

    @Override
    public Payment_T5 createPayment(Payment_T5 payment) {
        return paymentT5Repository.save(payment);
    }

    @Override
    public Payment_T5 updatePaymentPartially(Long id, Map<String, Object> updates) {
        Optional<Payment_T5> optionalPayment = paymentT5Repository.findById(id);
        if (optionalPayment.isPresent()) {
            Payment_T5 payment = optionalPayment.get();
            updates.forEach((key, value) -> {
                switch (key) {
                    case "date":
                        payment.setDate((Date) value);
                        break;
                    case "paymentMethod":
                        payment.setPaymentMethod((String) value);
                        break;
                    case "status":
                        payment.setStatus((String) value);
                        break;
                    // You might need to handle nested entities for property and customer
                }
            });
            return paymentT5Repository.save(payment);
        }
        return null;
    }

    @Override
    public void deletePayment(Long id) {
        paymentT5Repository.deleteById(id);
    }
}
