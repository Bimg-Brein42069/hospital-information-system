package com.had.ipd.repository;

import com.had.ipd.models.ConsentMap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConsentMapRepo extends JpaRepository<ConsentMap,Integer> {
    Optional<ConsentMap> getConsentMapByPatientIdAndDoctorId(int patientId,int doctorId);
    List<ConsentMap> getConsentMapByDoctorId(int doctorId);
}
