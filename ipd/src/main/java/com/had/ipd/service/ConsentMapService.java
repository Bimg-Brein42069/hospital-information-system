package com.had.ipd.service;

import com.had.ipd.models.ConsentMap;

import java.util.List;
import java.util.Optional;

public interface ConsentMapService {
    Optional<ConsentMap> getConsentMap(int patientId,int doctorId);
    List<ConsentMap> getDoctorConsentMap(int doctorId);
    ConsentMap addConsentMap(ConsentMap consentMap);
    void deleteConsentMap(int patientId,int doctorId);
}
