package com.had.ipd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.had.ipd.models.DoctorEncounter;
import com.had.ipd.service.DoctorEncounterService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@CrossOrigin
@RequestMapping("/ipd")
public class DoctorEncounterController {
    
    @Autowired 
    private DoctorEncounterService doctorEncounterService;

    @PostMapping("/add-doctor-encounter")
    public DoctorEncounter addDoctorEncounter(@RequestBody DoctorEncounter doctorEncounter) {
        return doctorEncounterService.addDoctorEncounter(doctorEncounter);
    }

    @GetMapping("/get-doctor-encounter-by-patient-id")
    public List<DoctorEncounter> getDoctorEncounters(@RequestParam("patientId") int patientId) {
        return doctorEncounterService.getAllDoctorEncounter(patientId);
    }

    @GetMapping("/get-doctor-encounter-by-patient-doctor-id")
    public List<DoctorEncounter> getDoctorEncountersOfDoctor(@RequestParam("patientId") int patientId, @RequestParam("doctorId") int doctorId) {
        return doctorEncounterService.getAllDoctorEncountersOfDoctor(patientId, doctorId);
    }
    

    @GetMapping("/get-latest-doctor-encounter-by-patient-id")
    public DoctorEncounter getLatestDoctorEncounters(@RequestParam("patientId") int patientId) {
        List<DoctorEncounter> allDoctorEncounters =  doctorEncounterService.getAllDoctorEncounter(patientId);
        return allDoctorEncounters.get(allDoctorEncounters.size()-1);
    }
}
