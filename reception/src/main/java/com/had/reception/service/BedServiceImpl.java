package com.had.reception.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.had.reception.models.Bed;
import com.had.reception.models.IpdAppointment;
import com.had.reception.repository.BedRepo;

@Service
public class BedServiceImpl implements BedService {

    @Autowired
    private BedRepo bedRepo;

    @Override
    public Bed updateBedStatusToOccupied(IpdAppointment ipdAppointment) {
        Integer bedNo = ipdAppointment.getBedNo();
        Integer wardNo = ipdAppointment.getWardNo();
        Integer patientId = ipdAppointment.getPatientId();

        Optional<Bed> optionalBed = bedRepo.findByBedNoAndWardNo(bedNo, wardNo);

        if (optionalBed.isPresent()) {
            Bed bed = optionalBed.get();
            if (bed.getStatus().equals("Occupied")) {
                System.out.println("This bed is Not Available");
                return null;
            }
            bed.setStatus("Occupied");
            bed.setPatientId(patientId);
            bedRepo.save(bed);
            return bed;
        } else {
            System.out.println("Bed not found with bed_no: " + bedNo + " and ward_no: " + wardNo);
        }
        return null;

    }

    @Override
    public Bed updateBedStatusToAvailable(IpdAppointment ipdAppointment) {
        Integer bedNo = ipdAppointment.getBedNo();
        Integer wardNo = ipdAppointment.getWardNo();
        Integer patientId = ipdAppointment.getPatientId();

        Optional<Bed> optionalBed = bedRepo.findByBedNoAndWardNo(bedNo, wardNo);

        if (optionalBed.isPresent()) {
            Bed bed = optionalBed.get();
            if (bed.getStatus().equals("Available")) {
                System.out.println("This bed is already free");
                return null;
            }
            bed.setStatus("Available");
            bed.setPatientId(null);
            bedRepo.save(bed);
            return bed;
        } else {
            System.out.println("Bed not found with bed_no: " + bedNo + " and ward_no: " + wardNo);
        }
        return null;

    }

    @Override
    public List<Bed> getAllBeds() {
        return bedRepo.findAll();
    }

    @Override
    public List<Integer> getAllWards() {
        return bedRepo.findAllDistinctWards();
    }

    @Override
    public void populateDummyData() {
        // Random random = new Random();
        Set<String> uniqueCombinations = new HashSet<>();

        for (int wardNo = 1; wardNo <= 8; wardNo++) {
            for (int bedNo = 1; bedNo <= 8; bedNo++) {

                String combination = bedNo + "_" + wardNo;

                // Check if the combination is unique
                if (!uniqueCombinations.contains(combination)) {
                    Bed bed = new Bed();
                    bed.setBedNo(bedNo);
                    bed.setWardNo(wardNo);
                    bed.setFloorNo(1); // Random floor number between 1 and 5
                    bed.setPatientId(null); // No patient assigned initially
                    bed.setStatus("Available"); // Set status to "Available"
                    bedRepo.save(bed); // Save the bed entity

                    uniqueCombinations.add(combination); // Add the combination to the set
                }
            }
        }
    }

    @Override
    public List<Bed> getAvailableBedsByWardNo(Integer wardNo) {
        return bedRepo.findByWardNoAndStatus(wardNo, "Available");
    }

}
