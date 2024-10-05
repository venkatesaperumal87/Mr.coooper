package com.example.Project_team_5.Service;

import com.example.Project_team_5.Model.Owner_T5;
import java.util.List;
import java.util.Map;

public interface Owner_T5ServiceInterface {
    List<Owner_T5> getAllOwners();
    Owner_T5 getOwnerById(Long id);
    Owner_T5 createOwner(Owner_T5 owner);
    Owner_T5 updateOwnerPartially(Long id, Map<String, Object> updates);
    void deleteOwner(Long id);
    Owner_T5 login(String email, String password);
}


