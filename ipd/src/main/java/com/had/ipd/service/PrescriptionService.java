package com.had.ipd.service;

import java.util.Optional;

import com.had.ipd.models.Prescription;

public interface PrescriptionService {
    public Prescription addPrescription(Prescription prescription);
    public Optional<Prescription> getPrescriptionById(Integer prescriptionId);
}
