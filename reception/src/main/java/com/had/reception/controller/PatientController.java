package com.had.reception.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.had.reception.models.Patient;
import com.had.reception.service.PatientService;

@RestController
@CrossOrigin
@RequestMapping("/patient")
public class PatientController {
    
    @Autowired
    private PatientService patientService;

    @PostMapping("/add-patient")
    public Patient addPatient(@RequestBody Patient patient){
        return patientService.savePatient(patient);
    }

    @GetMapping("/get-all-patients")
    public List<Patient> getAllPatients(){
        return patientService.getAllPatients();
    }
    
    @GetMapping("/get-demographics")
    public Optional<Patient> getDemographics(@RequestParam("id") Integer id){
        return patientService.getDemographics(id);
    }

    @GetMapping("/get-referable")
    public List<Patient> getReferable(){
        return patientService.getReferrable();
    }

    @PutMapping("/set-status")
    public Patient setStatus(@RequestParam int patientId,@RequestParam int status){
        return patientService.updatePatient(patientId, status);
    }

    @PutMapping("/delete-patient")
    public Patient deletePatient(@RequestParam("id") Integer id){
        return patientService.deletePatient(id);
    }
}
