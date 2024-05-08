package com.had.reception.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.had.reception.models.IpdAppointment;
import com.had.reception.repository.IpdAppointmentRepo;

@Service
public class IpdServiceImpl implements IpdService {
    @Autowired
    private IpdAppointmentRepo ipdAppointmentRepo;

    @Override
    public IpdAppointment createIpdAppointment(IpdAppointment ipdAppointment) {
        return ipdAppointmentRepo.save(ipdAppointment);
    }

    @Override
    public List<IpdAppointment> getIpdAppointments(){
        return ipdAppointmentRepo.findByIsActiveTrue();
    }

    @Override
    public IpdAppointment deleteIpdAppointment(int patientId) {
        Optional<IpdAppointment> ipdAppointmentOptional= ipdAppointmentRepo.findById(patientId);
        if(ipdAppointmentOptional.isEmpty())
            return null;
        IpdAppointment ipdAppointment = ipdAppointmentOptional.get();
        ipdAppointment.setIsActive(false);
        return ipdAppointmentRepo.save(ipdAppointment);
    }


}
