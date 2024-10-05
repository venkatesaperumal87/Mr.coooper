package com.example.Project_team_5.Service;

import com.example.Project_team_5.Model.Admin_T5;
import com.example.Project_team_5.Repository.Admin_T5Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class Admin_T5ServiceImplementation implements Admin_T5ServiceInterface {

    @Autowired
    private Admin_T5Repository adminT5Repository;

    @Override
    public List<Admin_T5> getAllAdmins() {
        List<Admin_T5> admin = new ArrayList<>();
        adminT5Repository.findAll().forEach(admin::add);
        return admin;
    }
    @Override
    public Admin_T5 login(String email, String password) {
        List<Admin_T5> admins = adminT5Repository.findAll();
        for (Admin_T5 admin : admins) {
            if (admin.getEmail().equals(email) && admin.getPassword().equals(password)) {
                return admin; // Return the admin if credentials match
            }
        }
        return null;
    }

    @Override
    public Admin_T5 getAdminById(Long id) {
        return adminT5Repository.findById(id).orElse(null);
    }

    @Override
    public Admin_T5 createAdmin(Admin_T5 admin) {
        return adminT5Repository.save(admin);
    }

    @Override
    public Admin_T5 updateAdminPartially(Long id, Map<String, Object> updates) {
        Optional<Admin_T5> optionalAdmin = adminT5Repository.findById(id);
        if (optionalAdmin.isPresent()) {
            Admin_T5 admin = optionalAdmin.get();
            updates.forEach((key, value) -> {
                switch (key) {
                    case "e_mail":
                        admin.setEmail((String) value);
                        break;
                    case "password":
                        admin.setPassword((String) value);
                        break;
                    case "admin_name":
                        admin.setAdminName((String) value);
                        break;
                }
            });
            return adminT5Repository.save(admin);
        }
        return null;
    }

    @Override
    public void deleteAdmin(Long id) {
        adminT5Repository.deleteById(id);
    }
}
