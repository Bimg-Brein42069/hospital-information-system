package com.had.reception.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.had.reception.models.Patient;

@Repository
public interface PatientRepo extends JpaRepository<Patient, Integer>{
    List<Patient> findAllByRedactedFalse();
    List<Patient> findAllByStatusAndRedactedFalse(int status);
}
