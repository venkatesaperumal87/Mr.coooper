package com.example.Project_team_5.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "Property_T5")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Property_T5 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Property_id")
    private Long propertyId;

    @ManyToOne
    @JoinColumn(name = "Owner_id", nullable = false)
    private Owner_T5 owner;

    @Column(name = "Property_Name", nullable = false)
    private String propertyName;

    @Column(name = "Property_Type")
    private String propertyType;

    @Column(name = "Location")
    private String location;

    @Column(name = "Status")
    private String status;

    @Column(name = "Document")
    private String document;

    @Column(name = "Amount", nullable = false)
    private BigDecimal amount;

    @Column(name = "Date")
    @Temporal(TemporalType.DATE)
    private Date date;

    @Column(name = "Images")
    private String images;

    @Column(name = "Likes")
    private Integer likes=0;

    @Column(name = "Views")
    private Integer views=0;

    @OneToMany(mappedBy = "properties")
    @JsonIgnore
    private Set<Review_T5> reviews;

    @OneToMany(mappedBy = "property")
    @JsonIgnore
    private Set<Request_T5> request;

}
