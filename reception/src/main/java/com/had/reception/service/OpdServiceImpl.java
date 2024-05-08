package com.had.reception.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.had.reception.models.OpdAppointment;
import com.had.reception.repository.OpdAppointmentRepo;

@Service
public class OpdServiceImpl implements OpdService{
    @Autowired
    private OpdAppointmentRepo opdAppointmentRepo;

    @Override
    public OpdAppointment createOpdAppointment(OpdAppointment opdAppointment) {
        return opdAppointmentRepo.save(opdAppointment);
    }

    @Override
    public List<OpdAppointment> getOpdAppointments(){
        return opdAppointmentRepo.findAllByIsactiveTrue();
    }

    @Override
    public List<OpdAppointment> getOpdAppointmentsDoctor(int doctorId) {
        return opdAppointmentRepo.findAllByDoctorIdAndIsactiveTrue(doctorId);
    }

    @Override
    public OpdAppointment deleteOpdAppointment(Integer patientId) {
        Optional<OpdAppointment> tp=opdAppointmentRepo.findById(patientId);
        if(tp.isEmpty())
            return null;
        OpdAppointment dOpdAppointment = tp.get();
        dOpdAppointment.setIsactive(false);
        return opdAppointmentRepo.save(dOpdAppointment);
    }
}
