package com.had.ipd.service;

import java.util.List;

import com.had.ipd.models.NurseEncounter;

public interface NurseEncounterService {

    public NurseEncounter addNurseEncounter(NurseEncounter nurseEncounter);
    public List<NurseEncounter> getAllNurseEncounters(int patientId);
    public List<NurseEncounter> getAllNurseEncountersOfNurse(int patientId, int nurseId);
}
