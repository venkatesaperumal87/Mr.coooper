package com.example.Project_team_5.Controller;

import com.example.Project_team_5.Model.Payment_T5;
import com.example.Project_team_5.Service.Payment_T5ServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:5173")
public class Payment_T5Controller {

    @Autowired
    private Payment_T5ServiceInterface paymentService;

    @GetMapping
    public List<Payment_T5> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Payment_T5> getPaymentById(@PathVariable Long id) {
        Payment_T5 payment = paymentService.getPaymentById(id);
        return ResponseEntity.ok(payment);
    }

    @PostMapping
    public Payment_T5 createPayment(@RequestBody Payment_T5 payment) {
        return paymentService.createPayment(payment);
    }

    @PatchMapping("/{id}")
    public Payment_T5 updatePaymentPartially(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        return paymentService.updatePaymentPartially(id, updates);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
        paymentService.deletePayment(id);
        return ResponseEntity.noContent().build();
    }
}
