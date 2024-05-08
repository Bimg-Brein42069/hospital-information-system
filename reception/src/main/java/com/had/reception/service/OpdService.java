package com.had.reception.service;

import java.util.List;

import com.had.reception.models.OpdAppointment;

public interface OpdService {
    public OpdAppointment createOpdAppointment(OpdAppointment opdAppointment);
    public List<OpdAppointment> getOpdAppointments();
    public List<OpdAppointment> getOpdAppointmentsDoctor(int doctorId);
    public OpdAppointment deleteOpdAppointment(Integer patientId);
} 
