package com.example.Project_team_5.Service;

import com.example.Project_team_5.Model.Property_T5;
import com.example.Project_team_5.Model.Review_T5;
import com.example.Project_team_5.Model.Customer_T5;
import com.example.Project_team_5.Repository.Property_T5Repository;
import com.example.Project_team_5.Repository.Review_T5Repository;
import com.example.Project_team_5.Repository.Customer_T5Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service
public class Review_T5ServiceImplementation implements Review_T5ServiceInterface {

    @Autowired
    private Review_T5Repository reviewT5Repository;

    @Autowired
    private Property_T5Repository propertyT5Repository;

    @Autowired
    private Customer_T5Repository customerT5Repository;

    @Override
    public List<Review_T5> getAllReviews() {
        return reviewT5Repository.findAll();
    }

    @Override
    public Review_T5 getReviewById(Long id) {
        return reviewT5Repository.findById(id).orElse(null);
    }

    @Override
    public Review_T5 createReview(Review_T5 review) {
        if (review.getProperties() != null) {
            Long propertyId = review.getProperties().getPropertyId();
            if (propertyId != null) {
                Property_T5 property = propertyT5Repository.findById(propertyId).orElse(null);
                if (property != null) {
                    review.setProperties(property);
                } else {
                    throw new IllegalArgumentException("Property not found");
                }
            } else {
                throw new IllegalArgumentException("Property ID must not be null");
            }
        }

        if (review.getCustomer() != null) {
            Long customerId = review.getCustomer().getCustomerId();
            if (customerId != null) {
                Customer_T5 customer = customerT5Repository.findById(customerId).orElse(null);
                if (customer != null) {
                    review.setCustomer(customer);
                } else {
                    throw new IllegalArgumentException("Customer not found");
                }
            } else {
                throw new IllegalArgumentException("Customer ID must not be null");
            }
        } else {
            throw new IllegalArgumentException("Customer must not be null");
        }

        return reviewT5Repository.save(review);
    }

    @Override
    public Review_T5 updateReviewPartially(Long id, Map<String, Object> updates) {
        Review_T5 review = reviewT5Repository.findById(id).orElse(null);
        if (review == null) {
            throw new IllegalArgumentException("Review not found");
        }

        // Apply updates to the review object
        updates.forEach((key, value) -> {
            switch (key) {
                case "comment":
                    review.setComment((String) value);
                    break;
                // Add cases for other fields if needed
                default:
                    throw new IllegalArgumentException("Invalid field: " + key);
            }
        });

        return reviewT5Repository.save(review);
    }

    @Override
    public void deleteReview(Long id) {
        reviewT5Repository.deleteById(id);
    }
}
