package com.had.ipd.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.had.ipd.models.Prescription;
import com.had.ipd.service.PrescriptionService;

    
@RestController
@CrossOrigin
@RequestMapping("/ipd")
public class PrescriptionController {
    
    @Autowired 
    private PrescriptionService prescriptionService;

    @PostMapping("/add-prescription")
    public Prescription addPrescription(@RequestBody Prescription prescription) {
        return prescriptionService.addPrescription(prescription);
    }

    @GetMapping("/get-prescription")
    public Optional<Prescription> getPrescription(@RequestParam Integer prescriptionId) {
        return prescriptionService.getPrescriptionById(prescriptionId);
    }
    
}
