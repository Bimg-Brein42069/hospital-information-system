package com.had.ipd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.had.ipd.models.DoctorEncounter;

public interface DoctorEncounterRepo extends JpaRepository<DoctorEncounter, Integer>{
    public List<DoctorEncounter> getAllDoctorEncounterByPatientId(int patientId);
    public List<DoctorEncounter> getAllDoctorEncountersByPatientIdAndDoctorId(int patientId, int doctorId);
}
