package com.had.reception.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.had.reception.models.Patient;
import com.had.reception.repository.PatientRepo;


@Service
public class PatientServiceImpl implements PatientService{

    @Autowired
    private PatientRepo patientRepo;

    @Override
    public Patient savePatient(Patient patient) {
        return patientRepo.save(patient);
    }

    @Override
    public List<Patient> getAllPatients(){
        return patientRepo.findAllByRedactedFalse();
    }
    
    @Override
    public Optional<Patient> getDemographics(Integer id){
        return patientRepo.findById(id);
    }

    @Override
    public Patient deletePatient(Integer id) {

        Optional<Patient> deletedPatient = patientRepo.findById(id);
        System.out.println(deletedPatient.isEmpty());
        if (deletedPatient.isEmpty())
            return null;
        Patient dPatient = deletedPatient.get();
        dPatient.setName("***********");
        int agemod = dPatient.getAge() % 10;
        int age = (dPatient.getAge() / 10) * 10;
        if (agemod > 5)
            age += 10;
        dPatient.setAge(age);
        dPatient.setAddress("************");
        dPatient.setPhoneNo("************");
        dPatient.setEmailId("************");
        dPatient.setRedacted(true);
        return patientRepo.save(dPatient);
    }

    @Override
    public List<Patient> getReferrable() {
        return patientRepo.findAllByStatusAndRedactedFalse(1);
    }

    @Override
    public Patient updatePatient(int patientId,int status) {
        Optional<Patient> optionalPatient=patientRepo.findById(patientId);
        if(optionalPatient.isEmpty())
            return null;
        Patient newPatient=optionalPatient.get();
        newPatient.setStatus(status);
        return patientRepo.save(newPatient);
    }


}
