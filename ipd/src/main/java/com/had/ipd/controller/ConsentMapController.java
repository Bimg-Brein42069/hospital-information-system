package com.had.ipd.controller;

import com.had.ipd.models.ConsentMap;
import com.had.ipd.service.ConsentMapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/consent")
public class ConsentMapController {
    @Autowired
    private ConsentMapService CMServ;

    @GetMapping("/get-consent")
    Optional<ConsentMap> getConsent(@RequestParam int patientId,@RequestParam int doctorId){
        return CMServ.getConsentMap(patientId, doctorId);
    }

    @GetMapping("/get-patients")
    List<ConsentMap> getPatients(@RequestParam int doctorId){
        return CMServ.getDoctorConsentMap(doctorId);
    }

    @PostMapping("/add-consent")
    ConsentMap addConsent(@RequestBody ConsentMap consentMap){
        return CMServ.addConsentMap(consentMap);
    }

    @DeleteMapping("/revoke-consent")
    void revokeConsent(@RequestParam int patientId,@RequestParam int doctorId){
        CMServ.deleteConsentMap(patientId, doctorId);
    }
}
