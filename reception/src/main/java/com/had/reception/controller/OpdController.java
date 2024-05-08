package com.had.reception.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.had.reception.models.OpdAppointment;
import com.had.reception.service.OpdService;


@RestController
@CrossOrigin
@RequestMapping("/patient")
public class OpdController {
    @Autowired
    private OpdService opdService;

    @PostMapping("/opdappointment")
    public String createOpdAppointment(@RequestBody OpdAppointment opdAppointment){
        opdService.createOpdAppointment(opdAppointment);
        return "Appointment created Successfully";
    }

    @GetMapping("/get-opd-appointments")
    public List<OpdAppointment> getOpdAppointments(){
        return opdService.getOpdAppointments();
    }

    @GetMapping("/get-doctor-opd")
    public List<OpdAppointment> getOpdDoctor(@RequestParam int doctorId){
        return opdService.getOpdAppointmentsDoctor(doctorId);
    }

    @PutMapping("/delete-opd-appointment")
    public void deleteOpdAppointment(@RequestParam Integer patientId){
        opdService.deleteOpdAppointment(patientId);
    }
}
