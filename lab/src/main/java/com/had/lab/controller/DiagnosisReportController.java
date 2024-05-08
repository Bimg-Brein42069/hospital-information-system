package com.had.lab.controller;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.had.lab.model.DiagnosisReport;
import com.had.lab.service.DiagnosisReportService;

@RestController
@CrossOrigin
@RequestMapping("/lab")
public class DiagnosisReportController {
    
    @Autowired 
    private DiagnosisReportService diagnosisReportService;

    @PostMapping("/add-diagnosis-report")
    public ResponseEntity<String> getDiagnosisReportPath(@RequestParam(name="files") MultipartFile[] files, @RequestParam(name="patientId") Integer patientId){
        return diagnosisReportService.saveDiagnosisReportImage(files, patientId);
    }

    @GetMapping("/get-diagnosis-report-by-patient-id")
    public List<DiagnosisReport> getDiagnosisReport(@RequestParam("patientId") int patientId){
        return diagnosisReportService.getDiagnosisReportByPatientId(patientId);
    }

}
