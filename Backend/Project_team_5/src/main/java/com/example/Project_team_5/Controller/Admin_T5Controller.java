package com.example.Project_team_5.Controller;

import com.example.Project_team_5.Model.Admin_T5;
import com.example.Project_team_5.Service.Admin_T5ServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/Admin_T5")
@CrossOrigin(origins = "http://localhost:5173/")
public class Admin_T5Controller {

    @Autowired
    private Admin_T5ServiceInterface adminService;

    @GetMapping
    public List<Admin_T5> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    @GetMapping("/{id}")
    public Admin_T5 getAdminById(@PathVariable Long id) {
        return adminService.getAdminById(id);
    }

    @PostMapping
    public Admin_T5 createAdmin(@RequestBody Admin_T5 admin) {
        return adminService.createAdmin(admin);
    }

    @PatchMapping("/{id}")
    public Admin_T5 updateAdminPartially(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        return adminService.updateAdminPartially(id, updates);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> loginRequest){
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");
        Admin_T5 admin = adminService.login(email,password);
        if(admin != null)
            return ResponseEntity.ok("Success");
        else
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
    @DeleteMapping("/{id}")
    public void deleteAdmin(@PathVariable Long id) {
        adminService.deleteAdmin(id);
    }
}
