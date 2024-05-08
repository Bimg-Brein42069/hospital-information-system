package com.had.ipd.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.had.ipd.models.Prescription;

public interface PrescriptionRepo extends JpaRepository<Prescription, Integer>{
    
}
