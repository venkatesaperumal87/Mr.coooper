package com.example.Project_team_5.Controller;

import com.example.Project_team_5.Model.Owner_T5;
import com.example.Project_team_5.Service.Owner_T5ServiceInterface;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/owner")
@CrossOrigin(origins = "http://localhost:5173/")
public class Owner_T5Controller {

    @Autowired
    private Owner_T5ServiceInterface ownerService;

    @GetMapping
    public List<Owner_T5> getAllOwners() {
        return ownerService.getAllOwners();
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody Map<String, String> loginRequest){
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");
        Owner_T5 owner = ownerService.login(email,password);
        if(owner != null)
            return ResponseEntity.status(200).body(owner);
        else
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @GetMapping("/{id}")
    public Owner_T5 getOwnerById(@PathVariable Long id) {
        return ownerService.getOwnerById(id);
    }

    @PostMapping
    public Owner_T5 createOwner(@RequestBody Owner_T5 owner) {
        return ownerService.createOwner(owner);
    }

    @PatchMapping("/{id}")
    public Owner_T5 updateOwnerPartially(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        return ownerService.updateOwnerPartially(id, updates);
    }

    @DeleteMapping("/{id}")
    public void deleteOwner(@PathVariable Long id) {
        ownerService.deleteOwner(id);
    }
}
