package com.had.ipd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.had.ipd.models.DoctorEncounter;
import com.had.ipd.repository.DoctorEncounterRepo; 

@Service
public class DoctorEncounterServiceImpl implements DoctorEncounterService{
    
    @Autowired
    private DoctorEncounterRepo doctorEncounterRepo;

    @Override
    public DoctorEncounter addDoctorEncounter(DoctorEncounter doctorEncounter){
        return doctorEncounterRepo.save(doctorEncounter);
    }

    @Override
    public List<DoctorEncounter> getAllDoctorEncounter(int patientId){
        return doctorEncounterRepo.getAllDoctorEncounterByPatientId(patientId);
    }

    @Override
    public List<DoctorEncounter> getAllDoctorEncountersOfDoctor(int patientId, int doctorId){
        return doctorEncounterRepo.getAllDoctorEncountersByPatientIdAndDoctorId(patientId, doctorId);
    }

}
