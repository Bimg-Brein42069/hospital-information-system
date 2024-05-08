package com.had.opd.service;

import java.util.List;

import com.had.opd.models.DiagnosisReport;

public interface DiagnosisReportService {
    public DiagnosisReport addDiagnosisReport(DiagnosisReport diagnosisReport);
    public List<DiagnosisReport> getDiagnosisReportByPatientId(Integer id);
}
