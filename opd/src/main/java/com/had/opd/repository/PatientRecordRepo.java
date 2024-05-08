package com.had.opd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.had.opd.models.PatientRecord;

@Repository
public interface PatientRecordRepo extends JpaRepository<PatientRecord, Integer> {
    List<PatientRecord> findByPatientId(Integer patientId);
    List<PatientRecord> findByPatientIdAndDoctorId(Integer patientId, Integer doctorId);
}
