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
@Table(name = "Request_T5")
public class Request_T5 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "Request_id")
    private Integer requestId;

    @ManyToOne
    @JoinColumn( name = "Customer_id",nullable = false)
    private Customer_T5 customer;

    @ManyToOne
    @JoinColumn(name="Owner_Id",nullable = false)
    private Owner_T5 owner;

    @ManyToOne
    @JoinColumn(name="Property_Id",nullable=false)
    private Property_T5 property;

    @Column(name="final_Status")
    private String Status;

    }
