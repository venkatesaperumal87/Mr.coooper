package com.example.Project_team_5.Repository;

import com.example.Project_team_5.Model.Property_T5;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface Property_T5Repository extends JpaRepository<Property_T5, Long> {
    @Query("SELECT p FROM Property_T5 p WHERE " +
            "(:minAmount IS NULL OR p.amount >= :minAmount) AND " +
            "(:maxAmount IS NULL OR p.amount <= :maxAmount) AND " +
            "(:location IS NULL OR p.location = :location) AND " +
            "(:propertyName IS NULL OR p.propertyName = :propertyName)")
    List<Property_T5> findByFilters(
            @Param("minAmount") BigDecimal minAmount,
            @Param("maxAmount") BigDecimal maxAmount,
            @Param("location") String location,
            @Param("propertyName") String propertyName);
    @Query("SELECT DISTINCT p.location FROM Property_T5 p")
    List<String> findDistinctLocations();

    @Query("SELECT DISTINCT p.propertyName FROM Property_T5 p")
    List<String> findDistinctPropertyNames();

    @Query("SELECT MIN(p.amount) FROM Property_T5 p")
    BigDecimal findMinPrice();

    @Query("SELECT MAX(p.amount) FROM Property_T5 p")
    BigDecimal findMaxPrice();

    @Query("SELECT p FROM Property_T5 p WHERE p.propertyType = ?1")
    List<Property_T5> findByPropertyType(String propertyType);
}
