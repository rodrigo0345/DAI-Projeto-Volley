package com.example.application.service;

import com.example.application.controller.Wrapper.ResponseType;
import com.example.application.model.Practice;
import com.example.application.model.Team.Team;
import com.example.application.repository.PracticeRepository;

import java.time.LocalDateTime;

public class PracticeService {


    public static ResponseType<Practice> createPractice(PracticeRepository practiceRepository, Team team,
                                                        String local, LocalDateTime startDate, LocalDateTime endDate){

        Practice practice = new Practice();

        practice.setEndDate(endDate);
        practice.setStartDate(startDate);
        practice.setLocal(local);
        practice.setTeam(team);

        practiceRepository.save(practice);

        var response = new ResponseType<Practice>();
        response.success(practice);
        return response;
    }

    public  static ResponseType<Practice> removePratice(PracticeRepository practiceRepository, Practice practice){

        practiceRepository.delete(practice);

        var response = new ResponseType<Practice>();
        response.success(practice);
        return response;

    }

    public static ResponseType<Practice> editPratice(PracticeRepository practiceRepository, Practice practice, String local, LocalDateTime startDate, LocalDateTime endDate){


        practice.setLocal(local);
        practice.setEndDate(endDate);
        practice.setStartDate(startDate);

        practiceRepository.save(practice);

        var response = new ResponseType<Practice>();
        response.success(practice);
        return response;
    }

}
