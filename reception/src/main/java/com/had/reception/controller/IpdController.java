package com.had.reception.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.had.reception.models.Bed;
import com.had.reception.models.IpdAppointment;
import com.had.reception.service.BedService;
import com.had.reception.service.IpdService;

@RestController
@CrossOrigin
@RequestMapping("/patient")
public class IpdController {
    @Autowired
    private IpdService ipdService;

    @Autowired
    private BedService bedService;

    @PostMapping("/ipdappointment")
    public String createIpdAppointment(@RequestBody IpdAppointment ipdAppointment){
        if(bedService.updateBedStatusToOccupied(ipdAppointment) != null)
        {
            ipdService.createIpdAppointment(ipdAppointment);
            return "Appointment created Successfully";
        }
        return "This bed is not available";
    }

    @GetMapping("/get-ipd-appointments")
    public List<IpdAppointment> getIpdAppointments(){
        return ipdService.getIpdAppointments();
    }

    @PutMapping("/delete-ipd-appointment")
    public String deleteIpdAppointment(@RequestBody IpdAppointment ipdAppointment){
        if(bedService.updateBedStatusToAvailable(ipdAppointment) != null)
        {
            ipdService.deleteIpdAppointment(ipdAppointment.getPatientId());
            return "Appointment deleted Successfully";
        }
        return "This bed is already free";
    }

    @GetMapping("/get-available-bedNo-by-wardNo")
    public List<Bed> getAvailableBedNumbers(@RequestParam Integer wardNo) {
        return bedService.getAvailableBedsByWardNo(wardNo);
    }

    @GetMapping("/view-beds")
    public List<Bed> getAllBeds()
    {
        return bedService.getAllBeds();
    }

    @GetMapping("/get-all-wards")
    public List<Integer> getAllWards()
    {
        return bedService.getAllWards();
    }

    @GetMapping("/populate-beds")
    public void populateDummyData()
    {
        bedService.populateDummyData();
    }
}
