package com.had.ipd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.had.ipd.models.NurseEncounter;
import com.had.ipd.repository.NurseEncounterRepo;


@Service
public class NurseEncounterServiceImpl implements NurseEncounterService{
    
     @Autowired
    private NurseEncounterRepo nurseEncounterRepo;

    @Override
    public NurseEncounter addNurseEncounter(NurseEncounter nurseEncounter){
        return nurseEncounterRepo.save(nurseEncounter);
    }

    @Override
    public List<NurseEncounter> getAllNurseEncounters(int patientId){
        return nurseEncounterRepo.getAllNurseEncounterByPatientId(patientId);
    }

    @Override
    public List<NurseEncounter> getAllNurseEncountersOfNurse(int patientId, int nurseId){
        return nurseEncounterRepo.getAllNurseEncountersByPatientIdAndNurseId(patientId, nurseId);
    }
}
