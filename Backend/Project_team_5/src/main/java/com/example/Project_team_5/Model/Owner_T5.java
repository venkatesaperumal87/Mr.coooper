package com.example.Project_team_5.Model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;
import java.util.Date;

@Entity
@Table(name = "Owner_T5")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Owner_T5 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Owner_id")
    private Long ownerId;

    @Column(name = "E_mail", nullable = false)
    private String email;

    @Column(name = "Password", nullable = false)
    private String password;

    @Column(name = "Name", nullable = false)
    private String name;

    @Column(name = "Address", nullable = false)
    private String address;

    @Column(name = "Bank_Details")
    private String bankDetails;

    @Column(name = "Mobile_Number")
    private String mobileNumber;

    @Column(name = "Registration_Date")
    @Temporal(TemporalType.DATE)
    private Date registrationDate;

    @Column(name = "Update_Date")
    @Temporal(TemporalType.DATE)
    private Date updateDate;

    @OneToMany(mappedBy = "owner")
    @JsonIgnore
    private Set<Property_T5> properties;

    @OneToMany(mappedBy = "owner")
    @JsonIgnore
    private Set<Request_T5> request;
}
