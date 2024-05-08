package com.had.opd.service;

import java.util.List;

import com.had.opd.models.PatientRecord;

public interface PatientRecordService {
    public PatientRecord addPatientRecord(PatientRecord patientRecord);
    public List<PatientRecord> getAllPatientRecords();
    public List<PatientRecord> getAllPatientRecordsByPatientId(Integer id);
    public List<PatientRecord> getAllPatientRecordsByPatientIdAndDoctorId(Integer patientId, Integer doctorId);
}
