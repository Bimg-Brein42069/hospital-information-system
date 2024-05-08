package com.had.ipd.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.had.ipd.models.Medication;
import com.had.ipd.service.MedicationService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@CrossOrigin
@RequestMapping("/ipd")
public class MedicationController {
    
    @Autowired 
    private MedicationService medicationService;

    @PostMapping("/add-medication")
    public Medication addMedication(@RequestBody Medication medication) {
        return medicationService.addMedication(medication);
    }

    @GetMapping("/get-medication")
    public Optional<Medication> getMedication(@RequestParam Integer medicationId) {
        return medicationService.getMedicationById(medicationId);
    }

    @GetMapping("/get-medication-by-prescription-id")
    public List<Medication> getMedicationByPrescriptionId(@RequestParam Integer prescriptionId){
        return medicationService.getMedicationByPrescriptionId(prescriptionId);
    }
    
}
