package com.example.Project_team_5.Controller;

import com.example.Project_team_5.Model.Review_T5;
import com.example.Project_team_5.Service.Review_T5ServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/Review_T5")
@CrossOrigin(origins = "http://localhost:5173/")
public class Review_T5Controller {

    @Autowired
    private Review_T5ServiceInterface reviewService;

    @GetMapping
    public List<Review_T5> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @GetMapping("/{id}")
    public Review_T5 getReviewById(@PathVariable Long id) {
        return reviewService.getReviewById(id);
    }

    @PostMapping
    public Review_T5 createReview(@RequestBody Review_T5 review) {
            return reviewService.createReview(review);

    }


    @PatchMapping("/{id}")
    public Review_T5 updateReviewPartially(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        return reviewService.updateReviewPartially(id, updates);
    }


    @DeleteMapping("/{id}")
    public void deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
    }
}
