package com.had.opd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.had.opd.models.DiagnosisReport;
import com.had.opd.repository.DiagnosisReportRepo;

@Service
public class DiagnosisReportServiceImpl implements DiagnosisReportService{
    
    @Autowired DiagnosisReportRepo diagnosisReportRepo;

    @Override
    public DiagnosisReport addDiagnosisReport(DiagnosisReport diagnosisReport){
        return diagnosisReportRepo.save(diagnosisReport);
    }

    @Override
    public List<DiagnosisReport> getDiagnosisReportByPatientId(Integer id){
        return diagnosisReportRepo.findByPatientId(id);
    }


    
}
