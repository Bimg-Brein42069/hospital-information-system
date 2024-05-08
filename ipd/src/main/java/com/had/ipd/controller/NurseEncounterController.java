package com.had.ipd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.had.ipd.models.NurseEncounter;
import com.had.ipd.service.NurseEncounterService;


@RestController
@CrossOrigin
@RequestMapping("/ipd")
public class NurseEncounterController {

    @Autowired 
    private NurseEncounterService nurseEncounterService;

    @PostMapping("/add-nurse-encounter")
    public NurseEncounter addNurseEncounter(@RequestBody NurseEncounter nurseEncounter) {
        return nurseEncounterService.addNurseEncounter(nurseEncounter);
    }

    @GetMapping("/get-nurse-encounter-by-patient-id")
    public List<NurseEncounter> getNurseEncounters(@RequestParam("patientId") int patientId) {
        return nurseEncounterService.getAllNurseEncounters(patientId);
    }

    @GetMapping("/get-nurse-encounter-by-patient-nurse-id")
    public List<NurseEncounter> getNurseEncountersOfNurse(@RequestParam("patientId") int patientId, @RequestParam("nurseId") int nurseId) {
        return nurseEncounterService.getAllNurseEncountersOfNurse(patientId, nurseId);
    }
 
}
