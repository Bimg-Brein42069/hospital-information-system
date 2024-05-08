package com.had.opd.models;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DiagnosisReport {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int diagnosisId;
    private int patientId;
    private int doctorId;
    private String reportLink;
}
