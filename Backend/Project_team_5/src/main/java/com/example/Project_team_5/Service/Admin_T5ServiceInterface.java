package com.example.Project_team_5.Service;

import com.example.Project_team_5.Model.Admin_T5;
import java.util.List;
import java.util.Map;

public interface Admin_T5ServiceInterface {
    List<Admin_T5> getAllAdmins();
    Admin_T5 getAdminById(Long id);
    Admin_T5 createAdmin(Admin_T5 admin);
    Admin_T5 updateAdminPartially(Long id, Map<String, Object> updates);
    void deleteAdmin(Long id);
    Admin_T5 login(String email, String password);
}
