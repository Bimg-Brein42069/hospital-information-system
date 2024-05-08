package com.had.reception.service;

import java.util.List;
import java.util.Optional;

import com.had.reception.models.Patient;

public interface PatientService {
    public Patient savePatient(Patient patient); 
    public List<Patient> getAllPatients();   
    public Optional<Patient> getDemographics(Integer id);
    public Patient deletePatient(Integer id);
    public List<Patient> getReferrable();
    public Patient updatePatient(int patientId,int status);
} 
