package com.had.reception.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.had.reception.models.OpdAppointment;

import java.util.List;

@Repository
public interface OpdAppointmentRepo extends JpaRepository<OpdAppointment, Integer> {
    List<OpdAppointment> findAllByIsactiveTrue();
    List<OpdAppointment> findAllByDoctorIdAndIsactiveTrue(int doctorId);
}
