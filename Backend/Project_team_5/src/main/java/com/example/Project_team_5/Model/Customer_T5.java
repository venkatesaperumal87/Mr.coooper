package com.example.Project_team_5.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Customer_T5")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Customer_T5 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    private Long customerId;

    @Column(name = "e_mail", nullable = false, unique = true) // Ensure unique email
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "customer_name", nullable = false)
    private String customerName;

    @Column(name = "address")
    private String address;

    @Column(name = "phone")
    private String phone;

    @Column(name = "registration_date")
    @Temporal(TemporalType.DATE)
    private Date registrationDate;

    @Column(name = "update_date")
    @Temporal(TemporalType.DATE)
    private Date updateDate;

    @OneToMany(mappedBy = "customer")
    @JsonIgnore
    private List<Review_T5> reviews;

    @OneToMany(mappedBy = "customer")
    @JsonIgnore
    private Set<Request_T5> request;
}
