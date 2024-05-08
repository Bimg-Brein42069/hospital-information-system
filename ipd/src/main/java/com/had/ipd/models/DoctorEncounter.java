package com.had.ipd.models;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.annotation.Generated;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorEncounter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int doctorEncounterId;
    private int patientId;
    private int doctorId;
    private int prescriptionId;

    // private String notes;
    // private String instructions;
    // private String prescriptions;

    @CreationTimestamp
    private Timestamp encounterTimestamp;
}
