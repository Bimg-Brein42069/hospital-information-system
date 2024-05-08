package com.had.lab.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.multipart.MultipartFile;
import com.had.lab.model.DiagnosisReport;
import java.util.List;

public interface DiagnosisReportRepo extends JpaRepository<DiagnosisReport, Integer>{
    List <DiagnosisReport> findAllByPatientId(int patientId); 
}
