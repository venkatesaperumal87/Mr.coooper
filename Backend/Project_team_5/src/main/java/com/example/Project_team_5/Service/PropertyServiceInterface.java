package com.example.Project_team_5.Service;

import com.example.Project_team_5.Model.Property_T5;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public interface PropertyServiceInterface {
    List<Property_T5> getAllProperties();
    Property_T5 getPropertyById(Long id);
    Property_T5 decrementLike(Long id);
    Property_T5 createProperty(Property_T5 property);
    Property_T5 updatePropertyPartially(Long id, Map<String, Object> updates);
    void deleteProperty(Long id);
    List<Property_T5> getPropertiesByFilter(BigDecimal minAmount, BigDecimal maxAmount, String location, String propertyType);
    Property_T5 incrementView(Long id);
    Property_T5 incrementLike(Long id);
    List<String> getDistinctLocations();
    List<String> getDistinctPropertyNames();
    BigDecimal getMinPrice();
    BigDecimal getMaxPrice();
    List<Property_T5> getPropertiesByType(String propertyType);
}
