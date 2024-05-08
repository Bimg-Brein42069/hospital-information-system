package com.had.ipd.models;

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
public class NurseEncounter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int nurseEncounterId;
    private int patientId;
    private int nurseId;
    private double temperature;
    private int lowBP;
    private int highBP;
    private String healthCondition;

    @CreationTimestamp
    private Timestamp encounterTimestamp;
}
