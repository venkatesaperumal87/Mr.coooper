package com.example.Project_team_5.Service;

import com.example.Project_team_5.Model.Owner_T5;
import com.example.Project_team_5.Repository.Owner_T5Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class Owner_T5ServiceImplementation implements Owner_T5ServiceInterface {

    @Autowired
    private Owner_T5Repository ownerT5Repository;

    @Override
    public List<Owner_T5> getAllOwners() {
        return ownerT5Repository.findAll();
    }

    @Override
    public Owner_T5 getOwnerById(Long id) {
        return ownerT5Repository.findById(id).orElse(null);
    }

    @Override
    public Owner_T5 login(String email, String password) {
        List<Owner_T5> owners = ownerT5Repository.findAll();
        for (Owner_T5 owner : owners) {
            if (owner.getEmail().equals(email) && owner.getPassword().equals(password)) {
                return owner; // Return the owner if credentials match
            }
        }
        return null;
    }

    @Override
    public Owner_T5 createOwner(Owner_T5 owner) {
        return ownerT5Repository.save(owner);
    }

    @Override
    public Owner_T5 updateOwnerPartially(Long id, Map<String, Object> updates) {
        Optional<Owner_T5> optionalOwner = ownerT5Repository.findById(id);
        if (optionalOwner.isPresent()) {
            Owner_T5 owner = optionalOwner.get();
            updates.forEach((key, value) -> {
                switch (key) {
                    case "email":
                        owner.setEmail((String) value);
                        break;
                    case "password":
                        owner.setPassword((String) value);
                        break;
                    case "name":
                        owner.setName((String) value);
                        break;
                    case "address":
                        owner.setAddress((String) value);
                        break;
                    case "bankDetails":
                        owner.setBankDetails((String) value);
                        break;
                    case "mobileNumber":
                        owner.setMobileNumber((String) value);
                        break;
                    case "registrationDate":
                        owner.setRegistrationDate((Date) value);
                        break;
                    case "updateDate":
                        owner.setUpdateDate((Date) value);
                        break;
                }
            });
            return ownerT5Repository.save(owner);
        }
        return null;
    }

    @Override
    public void deleteOwner(Long id) {
        ownerT5Repository.deleteById(id);
    }
}
