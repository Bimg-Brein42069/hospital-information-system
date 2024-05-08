package com.had.opd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.had.opd.models.DiagnosisReport;

public interface DiagnosisReportRepo extends JpaRepository<DiagnosisReport, Integer>{
    List<DiagnosisReport> findByPatientId(Integer patientId);
}
