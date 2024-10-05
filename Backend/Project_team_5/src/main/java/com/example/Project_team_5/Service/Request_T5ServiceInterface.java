package com.example.Project_team_5.Service;

import com.example.Project_team_5.Model.Request_T5;
import java.util.Optional;

public interface Request_T5ServiceInterface {

    Optional<Request_T5> findById(Integer requestId);

    Request_T5 save(Request_T5 request);

}
