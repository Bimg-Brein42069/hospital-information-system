package com.had.opd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.had.opd.models.PatientRecord;
import com.had.opd.repository.PatientRecordRepo;

@Service
public class PatientRecordServiceImpl implements PatientRecordService {
    
    @Autowired
    private PatientRecordRepo patientRecordRepository;

    @Override
    public PatientRecord addPatientRecord(PatientRecord patientRecord) {
        return patientRecordRepository.save(patientRecord);
    }

    @Override
    public List<PatientRecord> getAllPatientRecords() {
        return patientRecordRepository.findAll();
    }

    @Override
    public List<PatientRecord> getAllPatientRecordsByPatientId(Integer id) {
        return patientRecordRepository.findByPatientId(id);
    }

    @Override
    public List<PatientRecord> getAllPatientRecordsByPatientIdAndDoctorId(Integer patientId, Integer doctorId) {
        return patientRecordRepository.findByPatientIdAndDoctorId(patientId, doctorId);
    }
}
