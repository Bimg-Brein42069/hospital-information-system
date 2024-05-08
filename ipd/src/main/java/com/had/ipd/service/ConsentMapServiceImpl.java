package com.had.ipd.service;

import com.had.ipd.models.ConsentMap;
import com.had.ipd.repository.ConsentMapRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConsentMapServiceImpl implements ConsentMapService{
    @Autowired
    private ConsentMapRepo CMRepo;

    @Override
    public Optional<ConsentMap> getConsentMap(int patientId, int doctorId) {
        return CMRepo.getConsentMapByPatientIdAndDoctorId(patientId,doctorId);
    }

    @Override
    public List<ConsentMap> getDoctorConsentMap(int doctorId) {
        return CMRepo.getConsentMapByDoctorId(doctorId);
    }

    @Override
    public ConsentMap addConsentMap(ConsentMap consentMap) {
        Optional<ConsentMap> optionalConsentMap=CMRepo.getConsentMapByPatientIdAndDoctorId(consentMap.getPatientId(),consentMap.getDoctorId());
        if(optionalConsentMap.isPresent())
            return null;
        return CMRepo.save(consentMap);
    }

    @Override
    public void deleteConsentMap(int patientId, int doctorId) {
        Optional<ConsentMap> optionalConsentMap=CMRepo.getConsentMapByPatientIdAndDoctorId(patientId, doctorId);
        if(optionalConsentMap.isEmpty())
            return ;
        CMRepo.deleteById(optionalConsentMap.get().getId());
    }
}
