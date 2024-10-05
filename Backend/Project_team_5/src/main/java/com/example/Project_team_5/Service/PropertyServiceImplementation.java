package com.example.Project_team_5.Service;

import com.example.Project_team_5.Model.Property_T5;
import com.example.Project_team_5.Model.Owner_T5;
import com.example.Project_team_5.Repository.Property_T5Repository;
import com.example.Project_team_5.Repository.Owner_T5Repository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@Service
public class PropertyServiceImplementation implements PropertyServiceInterface {

    @Autowired
    private Property_T5Repository propertyT5Repository;

    @Autowired
    private Owner_T5Repository ownerT5Repository;

    @Override
    public List<Property_T5> getAllProperties() {
        return propertyT5Repository.findAll();
    }

    @Override
    public Property_T5 getPropertyById(Long id) {
        return propertyT5Repository.findById(id).orElse(null);
    }

    @Override
    public Property_T5 createProperty(Property_T5 property) {
        if (property.getOwner() != null && property.getOwner().getOwnerId() != null) {
            Owner_T5 owner = ownerT5Repository.findById(property.getOwner().getOwnerId()).orElse(null);
            if (owner != null) {
                property.setOwner(owner);
            } else {
                throw new IllegalArgumentException("Owner not found");
            }
        } else {
            throw new IllegalArgumentException("Owner or Owner ID cannot be null");
        }
        return propertyT5Repository.save(property);
    }


    @Override
    public Property_T5 incrementView(Long id) {
        Property_T5 property = propertyT5Repository.findById(id).orElseThrow(() -> new RuntimeException("Property not found"));
        property.setViews(property.getViews() + 1);
        return propertyT5Repository.save(property);
    }

    @Override
    public Property_T5 incrementLike(Long id) {
        Property_T5 property = propertyT5Repository.findById(id).orElseThrow(() -> new RuntimeException("Property not found"));
        property.setLikes(property.getLikes() + 1);
        return propertyT5Repository.save(property);
    }

    @Override
    public Property_T5 updatePropertyPartially(Long id, Map<String, Object> updates) {
        Optional<Property_T5> optionalProperty = propertyT5Repository.findById(id);
        if (optionalProperty.isPresent()) {
            Property_T5 property = optionalProperty.get();
            updates.forEach((key, value) -> {
                switch (key) {
                    case "propertyName":
                        property.setPropertyName((String) value);
                        break;
                    case "propertyType":
                        property.setPropertyType((String) value);
                        break;
                    case "location":
                        property.setLocation((String) value);
                        break;
                    case "status":
                        property.setStatus((String) value);
                        break;
                    case "document":
                        property.setDocument((String) value);
                        break;
                    case "amount":
                        property.setAmount(new BigDecimal(value.toString()));
                        break;
                    case "date":
                        property.setDate((Date) value);
                        break;
                    case "images":
                        try {
                            ObjectMapper objectMapper = new ObjectMapper();
                            String imagesJson = objectMapper.writeValueAsString(value);
                            property.setImages(imagesJson);
                        } catch (Exception e) {
                            throw new RuntimeException("Error converting images to JSON", e);
                        }
                        break;
                    case "owner":
                        Owner_T5 owner = ownerT5Repository.findById(((Number) ((Map<String, Object>) value).get("ownerId")).longValue()).orElse(null);
                        if (owner != null) {
                            property.setOwner(owner);
                        } else {
                            throw new IllegalArgumentException("Owner not found");
                        }
                        break;
                    default:
                        throw new IllegalArgumentException("Unexpected field: " + key);
                }
            });
            return propertyT5Repository.save(property);
        }
        return null;
    }

    @Override
    public Property_T5 decrementLike(Long id) {
        Property_T5 property = propertyT5Repository.findById(id).orElseThrow(() -> new RuntimeException("Property not found"));
        if (property.getLikes() > 0) {
            property.setLikes(property.getLikes() - 1);
        }
        return propertyT5Repository.save(property);
    }

    @Override
    public List<Property_T5> getPropertiesByFilter(BigDecimal minAmount, BigDecimal maxAmount, String location, String propertyName) {
        return propertyT5Repository.findByFilters(minAmount, maxAmount, location, propertyName);
    }

    @Override
    public void deleteProperty(Long id) {
        propertyT5Repository.deleteById(id);
    }

    @Override
    public List<String> getDistinctLocations() {
        return propertyT5Repository.findDistinctLocations();
    }

    @Override
    public List<String> getDistinctPropertyNames() {
        return propertyT5Repository.findDistinctPropertyNames();
    }

    @Override
    public BigDecimal getMinPrice() {
        return propertyT5Repository.findMinPrice();
    }

    @Override
    public List<Property_T5> getPropertiesByType(String propertyType) {
        return propertyT5Repository.findByPropertyType(propertyType);
    }

    @Override
    public BigDecimal getMaxPrice() {
        return propertyT5Repository.findMaxPrice();
    }

}
