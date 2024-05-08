package com.had.ipd.service;

import java.util.List;

import com.had.ipd.models.DoctorEncounter;

public interface DoctorEncounterService {
    public DoctorEncounter addDoctorEncounter(DoctorEncounter doctorEncounter);
    public List<DoctorEncounter> getAllDoctorEncounter(int patientId);
    public List<DoctorEncounter> getAllDoctorEncountersOfDoctor(int patientId, int doctorId);
}
