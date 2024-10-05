package com.example.Project_team_5.Controller;

import com.example.Project_team_5.Model.Request_T5;
import com.example.Project_team_5.Service.Request_T5ServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/request")
@CrossOrigin(origins = "http://localhost:5173/")
public class Request_T5Controller {

    @Autowired
    private Request_T5ServiceInterface requestService;

    @GetMapping("/{id}")
    public ResponseEntity<Request_T5> getRequestById(@PathVariable("id") Integer id) {
        Optional<Request_T5> request = requestService.findById(id);
        return request.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Request_T5> createRequest(@RequestBody Request_T5 request) {
        Request_T5 savedRequest = requestService.save(request);
        return ResponseEntity.status(201).body(savedRequest);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Request_T5> updateStatus(@PathVariable("id") Integer id, @RequestParam("status") String status) {
        Optional<Request_T5> requestOptional = requestService.findById(id);
        if (requestOptional.isPresent()) {
            Request_T5 request = requestOptional.get();
            request.setStatus(status);
            Request_T5 updatedRequest = requestService.save(request);
            return ResponseEntity.ok(updatedRequest);
        }
        return ResponseEntity.notFound().build();
    }
}
