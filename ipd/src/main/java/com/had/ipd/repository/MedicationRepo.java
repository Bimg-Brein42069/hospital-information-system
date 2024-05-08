package com.had.ipd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.had.ipd.models.Medication;

public interface MedicationRepo extends JpaRepository<Medication, Integer>{
    public List<Medication> findAllMedicationByPrescriptionId(Integer prescriptionId);
}
