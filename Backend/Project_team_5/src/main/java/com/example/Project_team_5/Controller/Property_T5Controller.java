package com.example.Project_team_5.Controller;

import com.example.Project_team_5.Model.Property_T5;
import com.example.Project_team_5.Service.PropertyServiceInterface;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/property")
@CrossOrigin(origins = "http://localhost:5173/")
public class Property_T5Controller {

    @Autowired
    private PropertyServiceInterface propertyService;

    private static final String IMAGE_DIR = "./Images/";

    @GetMapping
    public List<Property_T5> getAllProperties() {
        return propertyService.getAllProperties();
    }

    @GetMapping("/{id}")
    public Property_T5 getPropertyById(@PathVariable Long id) {
        return propertyService.getPropertyById(id);
    }

    @GetMapping("/filter")
    public List<Property_T5> getPropertiesByFilter(
            @RequestParam(required = false) BigDecimal minAmount,
            @RequestParam(required = false) BigDecimal maxAmount,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String propertyName) {
        return propertyService.getPropertiesByFilter(minAmount, maxAmount, location, propertyName);
    }

    @GetMapping("/type/{propertyType}")
    public List<Property_T5> getPropertiesByType(@PathVariable String propertyType) {
        return propertyService.getPropertiesByType(propertyType);
    }

    @PatchMapping("/{id}/toggle-like")
    public Property_T5 toggleLike(@PathVariable Long id, @RequestParam boolean liked) {
        if (liked) {
            return propertyService.incrementLike(id);
        } else {
            return propertyService.decrementLike(id);
        }
    }

    @PostMapping
    public ResponseEntity<?> createProperty(@RequestBody Property_T5 property) {
        try {
            Property_T5 createdProperty = propertyService.createProperty(property);
            return new ResponseEntity<>(createdProperty, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PatchMapping("/{id}")
    public Property_T5 updatePropertyPartially(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        return propertyService.updatePropertyPartially(id, updates);
    }

    @PatchMapping("/increment-view/{id}")
    public Property_T5 incrementView(@PathVariable Long id) {
        return propertyService.incrementView(id);
    }

    @PatchMapping("/increment-like/{id}")
    public Property_T5 incrementLike(@PathVariable Long id) {
        return propertyService.incrementLike(id);
    }

    @DeleteMapping("/{id}")
    public void deleteProperty(@PathVariable Long id) {
        propertyService.deleteProperty(id);
    }

    @GetMapping("/locations")
    public List<String> getDistinctLocations() {
        return propertyService.getDistinctLocations();
    }

    @GetMapping("/property-names")
    public List<String> getDistinctPropertyNames() {
        return propertyService.getDistinctPropertyNames();
    }

    @PostMapping("/{id}/upload-image")
    public ResponseEntity<String> uploadImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        // Create directory if it does not exist
        File directory = new File(IMAGE_DIR);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // Save the file to the directory
        String fileName = file.getOriginalFilename();
        File dest = new File(IMAGE_DIR + fileName);
        try {
            file.transferTo(dest);
            // Update property with new image path
            Property_T5 property = propertyService.getPropertyById(id);
            if (property == null) {
                return new ResponseEntity<>("Property not found", HttpStatus.NOT_FOUND);
            }
            String imagesJson = property.getImages();
            Map<String, String> images = new ObjectMapper().readValue(imagesJson, Map.class);
            images.put("im" + (images.size() + 1), "/Images/" + fileName);
            property.setImages(new ObjectMapper().writeValueAsString(images));
            propertyService.updatePropertyPartially(id, Map.of("images", property.getImages()));
            return new ResponseEntity<>("Image uploaded successfully", HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to upload image", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
