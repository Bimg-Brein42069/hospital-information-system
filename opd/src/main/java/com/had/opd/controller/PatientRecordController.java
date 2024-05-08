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

import com.had.opd.models.PatientRecord;
import com.had.opd.service.PatientRecordService;

@RestController
@CrossOrigin
@RequestMapping("/opd")
public class PatientRecordController {
    
    @Autowired
    private PatientRecordService patientRecordService;

    @PostMapping("/add-patient-record")
    public PatientRecord addPatientRecord(@RequestBody PatientRecord patientRecord){
        return patientRecordService.addPatientRecord(patientRecord);
    }

    @GetMapping("/get-all-patient-records")
    public List<PatientRecord> getAllPatientRecords(){
        return patientRecordService.getAllPatientRecords();
    }

    @GetMapping("/get-patient-records-patient-id")
    public List<PatientRecord> getAllPatientRecords(@RequestParam("id") Integer id){
        return patientRecordService.getAllPatientRecordsByPatientId(id);
    }

    @GetMapping("/get-patient-records-patient-doctor-id")
    public List<PatientRecord> getAllPatientRecords(@RequestParam("patientId") Integer patientId, @RequestParam("doctorId") Integer doctorId){
        return patientRecordService.getAllPatientRecordsByPatientIdAndDoctorId(patientId, doctorId);
    }
}
