package com.had.ipd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.had.ipd.models.NurseEncounter;

public interface NurseEncounterRepo extends JpaRepository<NurseEncounter, Integer>{
    public List<NurseEncounter> getAllNurseEncounterByPatientId(int patientId);
    public List<NurseEncounter> getAllNurseEncountersByPatientIdAndNurseId(int patientId, int nurseId);
}
