package com.had.opd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.had.opd.models.DiagnosisReport;
import com.had.opd.service.DiagnosisReportService;

@RestController
@CrossOrigin
@RequestMapping("/diagnosis")
public class DiagnosisReportController {
    
    @Autowired
    private DiagnosisReportService diagnosisReportService;

    @PostMapping("/add-diagnosis-report")
    public DiagnosisReport addDiagnosisReport(@RequestBody DiagnosisReport diagnosisReport){
        return diagnosisReportService.addDiagnosisReport(diagnosisReport);
    }

    @GetMapping("/get-diagnosis-report")
    public List<DiagnosisReport> getDiagnosisReportByPatientId(@RequestParam("id") Integer id){
        return diagnosisReportService.getDiagnosisReportByPatientId(id);
    }
}
