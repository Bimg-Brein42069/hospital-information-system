package com.had.reception.service;

import java.util.List;

import com.had.reception.models.Bed;
import com.had.reception.models.IpdAppointment;

public interface BedService {
    public Bed updateBedStatusToOccupied(IpdAppointment ipdAppointment);
    public Bed updateBedStatusToAvailable(IpdAppointment ipdAppointment);
    public List<Bed> getAllBeds();
    public List<Integer> getAllWards();
    public void populateDummyData() ;
    List<Bed> getAvailableBedsByWardNo(Integer wardNo);
}
