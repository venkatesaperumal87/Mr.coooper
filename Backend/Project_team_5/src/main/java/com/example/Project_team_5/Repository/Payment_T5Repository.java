package com.example.Project_team_5.Repository;

import com.example.Project_team_5.Model.Payment_T5;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Payment_T5Repository extends JpaRepository<Payment_T5, Long> {
}

