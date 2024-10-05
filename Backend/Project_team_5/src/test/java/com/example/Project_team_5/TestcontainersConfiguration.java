package com.example.Project_team_5;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.testcontainers.containers.MSSQLServerContainer;

@TestConfiguration
public class TestcontainersConfiguration {

    @Bean
    public MSSQLServerContainer<?> sqlServerContainer() {
        MSSQLServerContainer<?> sqlServerContainer = new MSSQLServerContainer<>("mcr.microsoft.com/mssql/server:2019-latest")
                .acceptLicense()
                .withInitScript("init.sql"); // Optional: use if you have an initialization script
        sqlServerContainer.start();
        return sqlServerContainer;
    }
}

