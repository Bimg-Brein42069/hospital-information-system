package com.had.lab.service;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.had.lab.model.DiagnosisReport;
import org.springframework.http.ResponseEntity;
import java.util.Map;


public interface DiagnosisReportService {
    public List<DiagnosisReport> getDiagnosisReportByPatientId(int patientId);
    public ResponseEntity<String> saveDiagnosisReportImage(MultipartFile[] files, int patientId);
}
