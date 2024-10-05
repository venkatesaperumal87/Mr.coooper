package com.example.Project_team_5.Service;

import com.example.Project_team_5.Model.Review_T5;
import java.util.List;
import java.util.Map;

public interface Review_T5ServiceInterface {
    List<Review_T5> getAllReviews();
    Review_T5 getReviewById(Long id);
    Review_T5 createReview(Review_T5 review);
    Review_T5  updateReviewPartially(Long id, Map<String, Object> updates);
    void deleteReview(Long id);
}
