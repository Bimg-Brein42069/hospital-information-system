package com.had.reception.service;

import java.util.List;

import com.had.reception.models.IpdAppointment;

public interface IpdService {
    public IpdAppointment createIpdAppointment(IpdAppointment ipdAppointment);
    public List<IpdAppointment> getIpdAppointments();
    public IpdAppointment deleteIpdAppointment(int patientId);
}
