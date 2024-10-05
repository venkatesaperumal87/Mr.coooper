package com.example.Project_team_5.Model;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "Review_T5")
public class Review_T5 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Long reviewId;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer_T5 customer;

    @ManyToOne
    @JoinColumn(name = "Property_id", nullable = false)
    private Property_T5 properties;

    @Column(name = "comment", columnDefinition = "NVARCHAR(255)")
    private String comment;
}
