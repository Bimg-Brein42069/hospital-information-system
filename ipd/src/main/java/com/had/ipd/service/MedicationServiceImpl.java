package com.had.ipd.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.had.ipd.models.Medication;
import com.had.ipd.repository.MedicationRepo;

@Service
public class MedicationServiceImpl implements MedicationService{

    @Autowired
    private MedicationRepo medicationRepo;

    @Override
    public Medication addMedication(Medication medication){
        return medicationRepo.save(medication);
    }
    
    @Override
    public Optional<Medication> getMedicationById(Integer medicationId){
        return medicationRepo.findById(medicationId);
    }

    @Override
    public List<Medication> getMedicationByPrescriptionId(Integer prescriptionId){
        return medicationRepo.findAllMedicationByPrescriptionId(prescriptionId);
    }

}
