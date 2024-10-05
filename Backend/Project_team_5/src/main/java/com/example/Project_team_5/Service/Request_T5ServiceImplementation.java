package com.example.Project_team_5.Service;

import com.example.Project_team_5.Model.Request_T5;
import com.example.Project_team_5.Repository.Request_T5Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class Request_T5ServiceImplementation implements Request_T5ServiceInterface {

    @Autowired
    private Request_T5Repository requestRepository;

    @Override
    public Optional<Request_T5> findById(Integer requestId) {
        return requestRepository.findById(requestId);
    }

    @Override
    public Request_T5 save(Request_T5 request) {
        request.setStatus("pending");
        return requestRepository.save(request);
    }

}
