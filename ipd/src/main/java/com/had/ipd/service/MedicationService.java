package com.had.ipd.service;

import java.util.List;
import java.util.Optional;

import com.had.ipd.models.Medication;

public interface MedicationService {

    public Medication addMedication(Medication medication);
    public Optional<Medication> getMedicationById(Integer medicationId);
    public List<Medication> getMedicationByPrescriptionId(Integer prescriptionId);
    
} 
