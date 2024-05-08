package com.had.ipd.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.had.ipd.models.Prescription;
import com.had.ipd.repository.PrescriptionRepo;

@Service
public class PrescriptionServiceImpl implements PrescriptionService{
    
    @Autowired
    private PrescriptionRepo prescriptionRepo;

    @Override
    public Prescription addPrescription(Prescription prescription){
        return prescriptionRepo.save(prescription);
    }

    @Override
    public Optional<Prescription> getPrescriptionById(Integer prescriptionId){
        return prescriptionRepo.findById(prescriptionId);
    }

}
